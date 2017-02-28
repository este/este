import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import {
  LoginMutation,
  LogoutMutation,
  SignupMutation,
} from './mutations/auth';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signup: SignupMutation,
    login: LoginMutation,
    logout: LogoutMutation,
  }),
});

export default mutation;
