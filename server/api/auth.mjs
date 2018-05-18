// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validate from './validate.mjs';

/*::
import type { Resolver } from './index';
import type {
  AuthMutationVariables,
  AuthMutationResponse,
  AuthInput,
} from '../../components/core/__generated__/AuthMutation.graphql';
import type {
  meQueryVariables,
  meQueryResponse,
} from '../../pages/__generated__/meQuery.graphql';
*/

export const validateAuth = (input /*: AuthInput */) => {
  // Props must be defined in case of error.
  const errors = { email: null, password: null };
  // Validate one by one or all, as you wish.
  const email = validate.email(input.email);
  if (email) return { ...errors, email };
  const password = validate.longStringMin5Chars(input.password);
  if (password) return { ...errors, password };
};

const auth /*: Resolver<
  AuthMutationVariables,
  AuthMutationResponse,
  'auth',
> */ = async (
  parent,
  { input },
  context,
) => {
  const errors = validateAuth(input);
  if (errors) return { token: null, errors };

  const createAuthPayload = user => ({
    token: jsonwebtoken.sign({ userId: user.id }, process.env.APP_SECRET || ''),
    errors: null,
  });

  if (input.isSignUp) {
    const exists = await context.db.exists.User({ email: input.email });
    if (exists)
      return {
        token: null,
        errors: {
          email: 'ALREADY_EXISTS',
          password: null,
        },
      };
    const password = await bcrypt.hash(input.password, 10);
    const user = await context.db.mutation.createUser({
      data: { email: input.email, password },
    });
    return createAuthPayload(user);
  } else {
    const user = await context.db.query.user({ where: { email: input.email } });
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid)
      return {
        token: null,
        errors: {
          email: null,
          password: 'WRONG_PASSWORD',
        },
      };
    return createAuthPayload(user);
  }
};

const me /*: Resolver<
  meQueryVariables,
  meQueryResponse,
  'me',
> */ = async (
  parent,
  args,
  context,
) => {
  const userId = context.getUserId();
  const user = await context.db.query.user({ where: { id: userId } });
  return user;
};

export default {
  mutations: {
    auth,
  },
  queries: {
    me,
  },
};

//
// const resolvers = {
//     async updateUser(parent, { input }, context) {
//       const userId = getUserId(context);
//       const user = await context.db.mutation.updateUser({
//         data: { themeName: input.themeName },
//         where: { id: userId },
//       });
//       return { user };
//     },
//   },
//
//   Query: {
//     // $ FlowFixMe
//     async me(parent, args, context, info) {
//       const userId = getUserId(context);
//       const user = await context.db.query.user({ where: { id: userId } }, info);
//       return user;
//     },
//
//     // $ FlowFixMe
//     async webs(parent, args, context, info) {
//       const userId = getUserId(context);
//       const webs = await context.db.query.websConnection(
//         {
//           where: { owner: { id: userId } },
//           orderBy: 'updatedAt_ASC',
//           first: args.first,
//         },
//         info,
//       );
//       return webs;
//     },
//
//     // $ FlowFixMe
//     async web(parent, { domain }, context, info) {
//       const userId = getUserId(context);
//       const requestingUserIsOwner = await context.db.exists.Web({
//         domain,
//         owner: { id: userId },
//       });
//       if (!requestingUserIsOwner) throwHttpStatus(403);
//       return context.db.query.web({ where: { domain } }, info);
//     },
//   },
// };
//
// module.exports = resolvers;
//
