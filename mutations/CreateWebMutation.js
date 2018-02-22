// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/Mutation';
import type {
  CreateWebMutationVariables,
  CreateWebMutationResponse,
} from './__generated__/CreateWebMutation.graphql';

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
    edgeName: 'edge',
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
