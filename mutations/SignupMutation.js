// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../types';
import type {
  SignupMutationVariables,
  SignupMutationResponse,
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

const commit: Commit<SignupMutationVariables, SignupMutationResponse> = (
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
  });

export default { commit };
