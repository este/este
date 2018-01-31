// @flow
// $FlowFixMe
import bcrypt from 'bcryptjs';
// $FlowFixMe
import jwt from 'jsonwebtoken';
import * as validation from '../validation';
import diacriticsMap from 'diacritics-map';

// Everything in one file until I recognize emerging patterns.
// Write first, refactor later, FTW.

// Steps to create a new mutation:
// - update database/datamodel.graphql and "yarn prisma deploy" if needed
// - test database mutation in playground
// - update appmodel.graphql
// - add mutation resolver here
// - test app mutation in playground

const createAuthPayload = user => ({
  token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
  user,
});

// So here is a thing. The backend can return ValidationErrors, which are used
// for forms or wherever we have object with props. Great for local errors.
// But backend can also return a single error, like notAuthorized or notExists
// or whatever ValidationError. That's for global errors.
// I think this is a good design simplification. Let's see.
type BackendError = validation.ValidationError | validation.ValidationErrors<*>;

const throwError = (error: BackendError) => {
  throw new Error(JSON.stringify(error));
};

const throwNotAuthorizedError = () => {
  throwError({ type: 'notAuthorized' });
};

const getUserId = ctx => {
  const Authorization = ctx.request.get('Authorization');
  if (!Authorization) throwNotAuthorizedError();
  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env.APP_SECRET);
  return userId;
};

const resolvers = {
  Mutation: {
    // $FlowFixMe
    async signup(parent, args, ctx, info) {
      const validationErrors = validation.validateEmailPassword(args);
      if (validationErrors) throwError(validationErrors);

      const userExists = await ctx.db.exists.User({ email: args.email });
      if (userExists) throwError({ email: { type: 'alreadyExists' } });

      const password = await bcrypt.hash(args.password, 10);
      const user = await ctx.db.mutation.createUser({
        data: { email: args.email, password },
      });
      return createAuthPayload(user);
    },

    // $FlowFixMe
    async signin(parent, args, ctx, info) {
      const validationErrors = validation.validateEmailPassword(args);
      if (validationErrors) throwError(validationErrors);

      const user = await ctx.db.query.user({ where: { email: args.email } });
      if (!user) throwError({ email: { type: 'notExists' } });

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throwError({ password: { type: 'invalid' } });
      return createAuthPayload(user);
    },

    // $FlowFixMe
    async createWeb(parent, args, ctx, info) {
      // Only an authorized user can create a web.
      const userId = getUserId(ctx);

      // The same logic as on clients.
      const validationErrors = validation.validateNewWeb(args);
      if (validationErrors) throwError(validationErrors);

      const domainName = args.name
        .toLowerCase()
        .split('')
        .map(char => diacriticsMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]/g, '');
      const timestamp = Date.now().toString(36);
      const domain = `${domainName}-${timestamp}`;

      return await ctx.db.mutation.createWeb(
        {
          data: {
            name: args.name,
            domain,
            owner: { connect: { id: userId } },
          },
        },
        info,
      );
    },

    // $FlowFixMe
    async deleteWeb(parent, { id }, ctx, info) {
      const userId = getUserId(ctx);
      const webExists = await ctx.db.exists.Web({
        id,
        owner: { id: userId },
      });
      if (!webExists) throwNotAuthorizedError();
      return ctx.db.mutation.deleteWeb({ where: { id } });
    },
  },

  Query: {
    // $FlowFixMe
    async me(parent, args, ctx, info) {
      const userId = getUserId(ctx);
      const user = await ctx.db.query.user({ where: { id: userId } }, info);
      return user;
    },

    // $FlowFixMe
    async webs(parent, args, ctx, info) {
      const userId = getUserId(ctx);
      const webs = await ctx.db.query.webs(
        {
          where: { owner: { id: userId } },
          orderBy: 'updatedAt_ASC',
        },
        info,
      );
      return webs;
    },
  },
};

export default resolvers;
