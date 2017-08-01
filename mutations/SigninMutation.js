// @flow
import type {
  SigninMutationResponse,
  SigninMutationVariables,
} from './__generated__/SigninMutation.graphql';
import type { Environment } from '../types';
import commitMutation from './_commitMutation';
import { graphql } from 'react-relay';

let clientMutationId = 0;

const signinMutation = graphql`
  mutation SigninMutation($signinInput: SigninUserInput!) {
    signinUser(input: $signinInput) {
      token
    }
  }
`;

const commit = (
  environment: Environment,
  email: string,
  password: string,
): Promise<SigninMutationResponse> =>
  commitMutation(environment, {
    mutation: signinMutation,
    variables: ({
      signinInput: {
        email: { email, password },
        clientMutationId: (clientMutationId++).toString(),
      },
    }: SigninMutationVariables),
  });

export default { commit };
