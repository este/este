// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import type { AuthMutation } from './__generated__/AuthMutation.graphql';

export type AuthCommit = Commit<AuthMutation>;
export type AuthErrors = Errors<AuthMutation, 'auth'>;

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

export default config;
