// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import type {
  CreateWebInput,
  CreateWebMutationResponse,
} from './__generated__/CreateWebMutation.graphql';
import { ConnectionHandler } from 'relay-runtime';
import { clientRoot, ensureConnection } from './utils';

const mutation = graphql`
  mutation CreateWebMutation($input: CreateWebInput!) {
    createWeb(input: $input) {
      edge {
        node {
          ...WebsItem
        }
      }
    }
  }
`;

const sharedUpdater = (store, recordEdge) => {
  const connection = ConnectionHandler.getConnection(
    store.get(clientRoot),
    'Webs_webs',
  );
  ensureConnection(connection);
  ConnectionHandler.insertEdgeAfter(connection, recordEdge);
};

const commit: Commit<CreateWebInput, CreateWebMutationResponse> = (
  environment,
  input,
  onCompleted,
  onError,
) =>
  commitMutation(environment, {
    mutation,
    // $FlowFixMe Wrong libdef.
    variables: { input },
    onCompleted,
    onError,
    updater: store => {
      const payload = store.getRootField('createWeb');
      if (!payload) return;
      const recordEdge = payload.getLinkedRecord('edge');
      sharedUpdater(store, recordEdge);
    },
  });

export default { commit };
