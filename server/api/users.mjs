// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validate from './validate.mjs';
/*::
import type { Resolver } from './index';
*/

/*::
import type {
  AuthMutationVariables,
  AuthMutationResponse,
  AuthInput,
} from '../../components/core/__generated__/AuthMutation.graphql';
*/

export const validateAuth = (input /*: AuthInput */) => {
  // I prefer one by one validation. Validations can be complex.
  const email = validate.email(input.email);
  // For some reason, webpack can't use spread syntax "{ ...errors, email }"
  // Probably .mjs issue fixed in Webpack 4.
  // I tried to add .mjs extension, but without success.
  if (email) return { email, password: null };
  const password = validate.max1024Min5Chars(input.password);
  if (password) return { password, email: null };
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
    if (!user)
      return {
        token: null,
        errors: {
          email: 'NOT_EXISTS',
          password: null,
        },
      };
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

/*::
import type {
  SetThemeMutationVariables,
  SetThemeMutationResponse,
} from '../../components/core/__generated__/SetThemeMutation.graphql';
*/

const setTheme /*: Resolver<
  SetThemeMutationVariables,
  SetThemeMutationResponse,
  'setTheme',
> */ = async (
  parent,
  { input },
  context,
) => {
  const userId = context.getUserId();
  const user = await context.db.mutation.updateUser({
    data: { themeName: input.themeName },
    where: { id: userId },
  });
  return { user };
};

/*::
import type {
  meQueryVariables,
  meQueryResponse,
} from '../../pages/__generated__/meQuery.graphql';
*/

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
    setTheme,
  },
  queries: {
    me,
  },
};
