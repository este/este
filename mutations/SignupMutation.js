// @flow
import type {
  SignupMutationResponse,
  SignupMutationVariables,
} from './__generated__/SignupMutation.graphql';
import type { Environment } from '../types';
import commitMutation from './_commitMutation';
import { graphql } from 'react-relay';

let clientMutationId = 0;

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
  email: string,
  password: string,
): Promise<SignupMutationResponse> =>
  commitMutation(environment, {
    mutation,
    variables: ({
      signupInput: {
        authProvider: { email: { email, password } },
        clientMutationId: (clientMutationId++).toString(),
      },
      signinInput: {
        email: { email, password },
        clientMutationId: (clientMutationId++).toString(),
      },
    }: SignupMutationVariables),
  });

export default { commit };
