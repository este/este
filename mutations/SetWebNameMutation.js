// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import * as generated from './__generated__/SetWebNameMutation.graphql';

export type SetWebNameCommit = Commit<
  generated.SetWebNameInput,
  generated.SetWebNameMutationResponse,
>;

export type SetWebNameErrors = Errors<
  generated.SetWebNameMutationResponse,
  'setWebName',
>;

const config = {
  mutation: graphql`
    mutation SetWebNameMutation($input: SetWebNameInput!) {
      setWebName(input: $input) {
        web {
          name
          id
        }
        errors {
          name
        }
      }
    }
  `,
};

export default config;
