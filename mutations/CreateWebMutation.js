// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Environment, PayloadError } from '../types';
import type {
  CreateWebMutationVariables,
  CreateWebMutationResponse,
} from './__generated__/CreateWebMutation.graphql';

const mutation = graphql`
  mutation CreateWebMutation($input: CreateWebInput!) {
    createWeb(input: $input) {
      web {
        id
      }
    }
  }
`;

const commit = (
  environment: Environment,
  variables: CreateWebMutationVariables,
  onCompleted: (
    response: CreateWebMutationResponse,
    payloadError: PayloadError,
  ) => void,
  onError: (error: any) => void,
) =>
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  });

export default { commit };
