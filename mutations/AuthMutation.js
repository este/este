// @flow
import { graphql } from 'react-relay';
import type { AuthMutation } from './__generated__/AuthMutation.graphql';
import useMutation from '../hooks/useMutation';
import validateAuth from '../validate/validateAuth';

const config = {
  mutation: graphql`
    mutation AuthMutation($input: AuthInput!) {
      auth(input: $input) {
        token
        errors {
          email
          password
        }
      }
    }
  `,
};

export function useAuthMutation() {
  return useMutation<AuthMutation, 'auth'>(config, 'auth', validateAuth);
}
