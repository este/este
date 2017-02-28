import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import UserType from './user_type';
import User from '../../models/user';
import ViewerType from './viewer_type';
import { nodeField, fromGlobalId } from './node_interface';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    node: nodeField,
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { id }) {
        return User.findById(fromGlobalId(id).id);
      },
    },

    viewer: {
      type: ViewerType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  }),
});

export default RootQueryType;
