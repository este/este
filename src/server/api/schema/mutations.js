import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from './types/user_type';
import AuthService from '../services/auth';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(_, args, req) {
        const user = { req };
        req.logout();
        return user;
      },
    },
  },
});

export default mutation;
