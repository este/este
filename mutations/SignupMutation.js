// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/Mutation';
import type {
  SignupMutationVariables,
  SignupMutationResponse,
} from './__generated__/SignupMutation.graphql';

const mutation = graphql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
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
