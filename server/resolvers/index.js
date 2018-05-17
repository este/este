// @flow
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const diacriticsMap = require('diacritics-map');
const validation = require('../validation');

const web = require('./web');

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

// For general API errors HTTP statuses are fine. Controlled means we can
// enforce a custom message or behavior, e.g. 401 should request auth etc.
// https://stackoverflow.com/a/6937030/233902
/*::
export type ControlledHttpStatus = 401 | 403 | 404;
*/

const throwHttpStatus = (status /*: ControlledHttpStatus */) => {
  throw new Error(status.toString());
};

const getUserId = context => {
  const authorization = context.request.get('authorization');
  if (!authorization) throwHttpStatus(401);
  const token = authorization.replace('Bearer ', '');
  const decoded = jsonwebtoken.verify(token, process.env.APP_SECRET || '');
  // https://flow.org/en/docs/lang/refinements
  // Note refinement must be gradual within if statement because of Flow.
  if (decoded != null && typeof decoded.userId === 'string') {
    return decoded.userId;
  }
  throwHttpStatus(401);
};

// enum ShortRequiredTextError {
//   TRIM
//   REQUIRED
//   MIN_3_CHARS
//   MAX_140_CHARS
// }

const resolvers = {
  Mutation: {
    async signup(parent, { input }, { db }) {
      // const validationErrors = validation.validateEmailPassword(input);
      // if (validationErrors) throwError(validationErrors);
      //
      // const userExists = await db.exists.User({ email: input.email });
      // if (userExists) throwError({ email: { type: 'alreadyExists' } });
      //
      // const password = await bcrypt.hash(input.password, 10);
      // const user = await db.mutation.createUser({
      //   data: { email: input.email, password },
      // });
      // return createAuthPayload(user);
    },

    async signin(parent, { input }, { db }) {
      // const validationErrors = validation.validateEmailPassword(input);
      // if (validationErrors) throwError(validationErrors);
      //
      // const user = await db.query.user({ where: { email: input.email } });
      // // I don't know how to easily type email prop. Switch to ReasonML asap.
      // // TODO: Hmm, a co mit to fakt ve schematu?
      // if (!user) throwError({ email: { type: 'notExists' } });
      //
      // const valid = await bcrypt.compare(input.password, user.password);
      // if (!valid) throwError({ password: { type: 'wrongPassword' } });
      // return createAuthPayload(user);
    },

    ...web.mutations,

    async updateUser(parent, { input }, context) {
      const userId = getUserId(context);
      const user = await context.db.mutation.updateUser({
        data: { themeName: input.themeName },
        where: { id: userId },
      });
      return { user };
    },
  },

  Query: {
    // $FlowFixMe
    async me(parent, args, context, info) {
      const userId = getUserId(context);
      const user = await context.db.query.user({ where: { id: userId } }, info);
      return user;
    },

    // $FlowFixMe
    async webs(parent, args, context, info) {
      const userId = getUserId(context);
      const webs = await context.db.query.websConnection(
        {
          where: { owner: { id: userId } },
          orderBy: 'updatedAt_ASC',
          first: args.first,
        },
        info,
      );
      return webs;
    },

    // $FlowFixMe
    async web(parent, { domain }, context, info) {
      const userId = getUserId(context);
      const requestingUserIsOwner = await context.db.exists.Web({
        domain,
        owner: { id: userId },
      });
      if (!requestingUserIsOwner) throwHttpStatus(403);
      return context.db.query.web({ where: { domain } }, info);
    },
  },
};

module.exports = resolvers;
