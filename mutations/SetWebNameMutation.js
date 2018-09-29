// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import type { SetWebNameMutation } from './__generated__/SetWebNameMutation.graphql';

export type SetWebNameCommit = Commit<SetWebNameMutation>;
export type SetWebNameErrors = Errors<SetWebNameMutation, 'setWebName'>;

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
