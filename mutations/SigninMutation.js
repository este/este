// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Environment, PayloadError } from '../types';
import type {
  SigninMutationResponse,
  SigninMutationVariables,
} from './__generated__/SigninMutation.graphql';

const mutation = graphql`
  mutation SigninMutation($signinInput: SigninUserInput!) {
    signinUser(input: $signinInput) {
      token
    }
  }
`;

const commit = (
  environment: Environment,
  variables: SigninMutationVariables,
  onCompleted: (
    response: SigninMutationResponse,
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
