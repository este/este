import {
  nodeDefinitions,
  connectionDefinitions,
  globalIdField,
  fromGlobalId,
} from 'graphql-relay';

import UserType from './user_type';
import User from '../../models/user';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'User' || type === 'Viewer') {
      return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
          if (err) {
            reject(err);
          }

          resolve(user);
        });
      });
    }
  },
);

export {
  nodeInterface,
  nodeField,
  globalIdField,
  fromGlobalId,
  connectionDefinitions,
};
