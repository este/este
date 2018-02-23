// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/Mutation';
import type {
  CreateWebMutationVariables,
  CreateWebMutationResponse,
} from './__generated__/CreateWebMutation.graphql';
import { ConnectionHandler } from 'relay-runtime';
import ensureConnection from './ensureConnection';

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
  const clientRoot = store.get('client:root');
  const connection = ConnectionHandler.getConnection(clientRoot, 'Webs_webs');
  ensureConnection(connection);
  ConnectionHandler.insertEdgeAfter(connection, recordEdge);
};

const commit: Commit<CreateWebMutationVariables, CreateWebMutationResponse> = (
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
      const payload = store.getRootField('createWeb');
      const recordEdge = payload.getLinkedRecord('edge');
      sharedUpdater(store, recordEdge);
    },
  });

export default { commit };
