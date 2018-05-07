// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import type {
  AuthInput,
  SignupMutationResponse,
} from './__generated__/SignupMutation.graphql';

const mutation = graphql`
  mutation SignupMutation($input: AuthInput!) {
    signup(input: $input) {
      token
    }
  }
`;

const commit: Commit<AuthInput, SignupMutationResponse> = (
  environment,
  input,
  onCompleted,
  onError,
) =>
  commitMutation(environment, {
    mutation,
    // $FlowFixMe Wrong libdef.
    variables: { input },
    onCompleted,
    onError,
  });

export default { commit };
