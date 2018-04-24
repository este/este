// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import type {
  DeleteWebMutationVariables,
  DeleteWebMutationResponse,
} from './__generated__/DeleteWebMutation.graphql';
import { ConnectionHandler } from 'relay-runtime';
import { clientRoot, ensureConnection } from './utils';

const mutation = graphql`
  mutation DeleteWebMutation($id: ID!) {
    deleteWeb(id: $id) {
      id
    }
  }
`;

const sharedUpdater = (store, id) => {
  const connection = ConnectionHandler.getConnection(
    store.get(clientRoot),
    'Webs_webs',
  );
  ensureConnection(connection);
  ConnectionHandler.deleteNode(connection, id);
};

const commit: Commit<DeleteWebMutationVariables, DeleteWebMutationResponse> = (
  environment,
  variables,
  onCompleted,
  onError,
) =>
  commitMutation(environment, {
    mutation,
    // $FlowFixMe Wrong libdef.
    variables,
    onCompleted,
    onError,
    updater: store => {
      // How we can get clientRoot:
      // const clientRoot = store.get('client:root');
      // clientRoot.setLinkedRecords(attendance, 'attendance', args);
      const payload = store.getRootField('deleteWeb');
      if (!payload) return;
      const id = payload.getValue('id');
      sharedUpdater(store, id);
    },
    // // https://github.com/facebook/relay/issues/2345
    // optimisticUpdater: store => {
    //   sharedUpdater(store, variables.input.id);
    // },
  });

export default { commit };
