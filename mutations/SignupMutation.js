// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Environment, PayloadError } from '../types';
import type {
  SignupMutationResponse,
  SignupMutationVariables,
} from './__generated__/SignupMutation.graphql';

const mutation = graphql`
  mutation SignupMutation(
    $signupInput: SignupUserInput!
    $signinInput: SigninUserInput!
  ) {
    createUser(input: $signupInput) {
      user {
        id
      }
    }
    signinUser(input: $signinInput) {
      token
    }
  }
`;

const commit = (
  environment: Environment,
  variables: SignupMutationVariables,
  onCompleted: (
    response: SignupMutationResponse,
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
