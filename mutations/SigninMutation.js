// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../types';
import type {
  SigninMutationResponse,
  SigninMutationVariables,
} from './__generated__/SigninMutation.graphql';

const mutation = graphql`
  mutation SigninMutation($signinInput: SigninUserInput!) {
    signinUser(input: $signinInput) {
      token
      user {
        id
      }
    }
  }
`;

const commit: Commit<SigninMutationVariables, SigninMutationResponse> = (
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
