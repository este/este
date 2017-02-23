import {
  GraphQLObjectType,
  GraphQLID,
} from 'graphql';

import UserType from './user_type';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

export default RootQueryType;
