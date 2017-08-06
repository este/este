// @flow
import type { DeletePostMutationVariables } from './__generated__/DeletePostMutation.graphql';
import type { Environment, Id } from '../types';
import commitMutation from './_commitMutation';
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
  const viewerProxy = store.get(viewerId);
  const connection = ConnectionHandler.getConnection(
    viewerProxy,
    'Posts_allPosts',
    // https://github.com/facebook/relay/issues/1808#issuecomment-304519883
    { orderBy: 'createdAt_DESC' },
  );
  ConnectionHandler.deleteNode(connection, deletedId);
};

// Should not be required, but it is. Probably graph.cool issue.
let clientMutationId = 0;

const commit = (environment: Environment, viewerId: Id, id: Id) =>
  commitMutation(environment, {
    mutation,
    variables: ({
      input: {
        id,
        clientMutationId: (clientMutationId++).toString(),
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
