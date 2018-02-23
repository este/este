// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/Mutation';
import type {
  DeleteWebMutationVariables,
  DeleteWebMutationResponse,
} from './__generated__/DeleteWebMutation.graphql';
import { ConnectionHandler } from 'relay-runtime';
import ensureConnection from './ensureConnection';

const mutation = graphql`
  mutation DeleteWebMutation($input: DeleteWebInput!) {
    deleteWeb(input: $input) {
      id
    }
  }
`;

const sharedUpdater = (store, id) => {
  const clientRoot = store.get('client:root');
  const connection = ConnectionHandler.getConnection(clientRoot, 'Webs_webs');
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
    variables,
    onCompleted,
    onError,
    updater: store => {
      const payload = store.getRootField('deleteWeb');
      const id = payload.getValue('id');
      sharedUpdater(store, id);
    },
    // // https://github.com/facebook/relay/issues/2345
    // optimisticUpdater: store => {
    //   sharedUpdater(store, variables.input.id);
    // },
  });

export default { commit };
