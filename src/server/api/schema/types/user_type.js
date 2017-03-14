import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { nodeInterface, globalIdField } from './node_interface';

import User from '../../models/user';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField(),
    username: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  interfaces: () => [nodeInterface],
  isTypeOf: (value) => {
    return value instanceof User;
  },
});

export default UserType;
