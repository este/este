// @flow
import type { DeletePostMutationVariables } from './__generated__/DeletePostMutation.graphql';
import type { Id } from '../types';
import createCommit from './createCommit';
import { ConnectionHandler } from 'relay-runtime';
import { graphql } from 'react-relay';

const mutation = graphql`
  mutation DeletePostMutation($input: DeletePostInput!) {
    # Ask for data used in updater.
    deletePost(input: $input) {
      deletedId
    }
  }
`;

const updater = (store, viewerId, deletedId) => {
  const userProxy = store.get(viewerId);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    'Posts_allPosts',
    // https://github.com/facebook/relay/issues/1808#issuecomment-304519883
    { orderBy: 'createdAt_DESC' },
  );
  ConnectionHandler.deleteNode(connection, deletedId);
};

const commit = (environment: Object, viewerId: Id, id: Id) =>
  createCommit(environment, {
    mutation,
    variables: ({
      input: {
        id,
        clientMutationId: Date.now().toString(32),
      },
    }: DeletePostMutationVariables),
    updater: store => {
      const payload = store.getRootField('deletePost');
      updater(store, viewerId, payload.getValue('deletedId'));
    },
    optimisticUpdater: store => {
      updater(store, viewerId, id);
    },
  });

export default { commit };
