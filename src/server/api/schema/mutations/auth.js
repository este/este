import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import ViewerType from '../types/viewer_type';
import AuthService from '../../services/auth';

export const LoginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: ViewerType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: ({ email, password }, req) => (
    AuthService.login({ email, password, req })
  ),
});

export const SignupMutation = mutationWithClientMutationId({
  name: 'SignUp',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: ViewerType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: ({ email, password }, req) => (
    AuthService.signup({ email, password, req })
  ),
});

// TODO: better operational response
export const LogoutMutation = mutationWithClientMutationId({
  name: 'Logout',
  inputFields: null,
  outputFields: {
    user: {
      type: ViewerType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload(_, req) {
    const user = { req };
    req.logout();
    return user;
  },
});

