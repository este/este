// @flow
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const diacriticsMap = require('diacritics-map');
const validation = require('../validation');
/*::
import type { ServerError } from '../error';
*/

// Workflow
// - update database/model.graphql
// - yarn deploy:db
// - test it in playground
// - update server/model.graphql
// - add resolver here
// - test it in playground
// - yarn schema-relay
// - restart `yarn dev`
// - now we can use it in client code

const createAuthPayload = user => ({
  token: jsonwebtoken.sign({ userId: user.id }, process.env.APP_SECRET || ''),
  user,
});

// TODO: https://github.com/este/este/issues/1488
const throwError = (error /*: ServerError */) => {
  throw new Error(JSON.stringify(error));
};

const throwNotAuthorizedError = () => throwError({ type: 'notAuthorized' });

const getUserId = ctx => {
  const authorization = ctx.request.get('authorization');
  if (!authorization) throwNotAuthorizedError();
  const token = authorization.replace('Bearer ', '');
  const decoded = jsonwebtoken.verify(token, process.env.APP_SECRET || '');
  // https://flow.org/en/docs/lang/refinements
  // Note refinement must be gradual within if statement because of Flow.
  if (decoded != null && typeof decoded.userId === 'string') {
    return decoded.userId;
  }
  throwNotAuthorizedError();
};

/*::
// Will be generated one day.
type Parent = Object;
type Args = Object;
type Context = Object;
type Info = Object;
type Resolvers = {
  ['Mutation' | 'Query']: {
    [string]: (Parent, Args, Context, Info) => mixed,
  },
};
*/

const resolvers /*: Resolvers */ = {
  Mutation: {
    async signup(parent, { input }, { db }) {
      const validationErrors = validation.validateEmailPassword(input);
      if (validationErrors) throwError(validationErrors);

      const userExists = await db.exists.User({ email: input.email });
      if (userExists) throwError({ email: { type: 'alreadyExists' } });

      const password = await bcrypt.hash(input.password, 10);
      const user = await db.mutation.createUser({
        data: { email: input.email, password },
      });
      return createAuthPayload(user);
    },

    async signin(parent, { input }, { db }) {
      const validationErrors = validation.validateEmailPassword(input);
      if (validationErrors) throwError(validationErrors);

      const user = await db.query.user({ where: { email: input.email } });
      // I don't know how to easily type email prop. Switch to ReasonML asap.
      if (!user) throwError({ email: { type: 'notExists' } });

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throwError({ password: { type: 'wrongPassword' } });
      return createAuthPayload(user);
    },

    async createWeb(parent, { input }, ctx) {
      // Only an authorized user can create a web.
      const userId = getUserId(ctx);

      // The same logic as on clients.
      const validationErrors = validation.validateNewWeb(input);
      if (validationErrors) throwError(validationErrors);

      const domainName = input.name
        .toLowerCase()
        .split('')
        .map(char => diacriticsMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]/g, '');
      const timestamp = Date.now().toString(36);
      const domain = `${domainName}-${timestamp}`;

      const web = await ctx.db.mutation.createWeb({
        data: {
          name: input.name,
          domain,
          owner: { connect: { id: userId } },
        },
      });

      return {
        edge: {
          node: web,
        },
      };
    },

    async deleteWeb(parent, { input }, ctx) {
      const userId = getUserId(ctx);
      const webExists = await ctx.db.exists.Web({
        id: input.id,
        owner: { id: userId },
      });
      if (!webExists) throwNotAuthorizedError();
      await ctx.db.mutation.deleteWeb({ where: { id: input.id } });
      return { id: input.id };
    },

    async updateUser(parent, { input }, ctx) {
      const userId = getUserId(ctx);
      const user = await ctx.db.mutation.updateUser({
        data: { themeName: input.themeName },
        where: { id: userId },
      });
      return { user };
    },
  },

  Query: {
    async me(parent, args, ctx, info) {
      const userId = getUserId(ctx);
      const user = await ctx.db.query.user({ where: { id: userId } }, info);
      return user;
    },

    async webs(parent, args, ctx, info) {
      const userId = getUserId(ctx);
      const webs = await ctx.db.query.websConnection(
        {
          where: { owner: { id: userId } },
          orderBy: 'updatedAt_ASC',
          first: args.first,
        },
        info,
      );
      return webs;
    },

    async web(parent, { domain }, ctx, info) {
      const userId = getUserId(ctx);
      const requestingUserIsOwner = await ctx.db.exists.Web({
        domain,
        owner: { id: userId },
      });
      if (!requestingUserIsOwner) throwNotAuthorizedError();
      return ctx.db.query.web({ where: { domain } }, info);
    },
  },
};

module.exports = resolvers;
