// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import * as generated from './__generated__/AuthMutation.graphql';

export type AuthCommit = Commit<
  generated.AuthInput,
  generated.AuthMutationResponse,
>;

export type AuthErrors = Errors<generated.AuthMutationResponse, 'auth'>;

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
