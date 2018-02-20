// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/Mutation';
import type {
  CreateWebMutationVariables,
  CreateWebMutationResponse,
} from './__generated__/CreateWebMutation.graphql';

const mutation = graphql`
  mutation CreateWebMutation($name: String!) {
    createWeb(name: $name) {
      webEdge {
        node {
          ...WebsItem
        }
      }
    }
  }
`;

const configs = [
  {
    type: 'RANGE_ADD',
    parentID: 'client:root',
    connectionInfo: [
      {
        key: 'Webs_webs',
        rangeBehavior: 'append',
      },
    ],
    edgeName: 'webEdge',
  },
];

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
    configs,
  });

export default { commit };
