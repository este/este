// @flow
import { commitMutation } from 'react-relay';

// TODO: Consider clientMutationId faking.

const createCommit = (environment: Object, config: Object) =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      ...config,
      onCompleted: () => resolve(),
      onError: error => reject({ appError: error }),
    });
  });

export default createCommit;
