import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import {
  nodeInterface,
  globalIdField,
} from './node_interface';

import UserType from './user_type';
import User from '../../models/user';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField(),
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    user: {
      description: 'Returns the currently logged in user',
      type: UserType,
      resolve(parentValue) {
        return parentValue;
      },
    },
  },
});

export default ViewerType;
