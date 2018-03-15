// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import type {
  SigninMutationResponse,
  SigninMutationVariables,
} from './__generated__/SigninMutation.graphql';

const mutation = graphql`
  mutation SigninMutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
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
    // $FlowFixMe Wrong libdef.
    variables,
    onCompleted,
    onError,
  });

export default { commit };
