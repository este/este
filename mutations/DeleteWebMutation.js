// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import type { DeleteWebMutation } from './__generated__/DeleteWebMutation.graphql';

export type DeleteWebCommit = Commit<DeleteWebMutation>;
export type DeleteWebErrors = Errors<DeleteWebMutation, 'setWebName'>;

const config = {
  mutation: graphql`
    mutation DeleteWebMutation($input: DeleteWebInput!) {
      deleteWeb(input: $input) {
        web {
          id
        }
      }
    }
  `,
};

export default config;
