// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import type { SetPageTitleMutation } from './__generated__/SetPageTitleMutation.graphql';

export type SetPageTitleCommit = Commit<SetPageTitleMutation>;
export type SetPageTitleErrors = Errors<SetPageTitleMutation, 'setPageTitle'>;

const config = {
  mutation: graphql`
    mutation SetPageTitleMutation($input: SetPageTitleInput!) {
      setPageTitle(input: $input) {
        page {
          title
        }
        errors {
          title
        }
      }
    }
  `,
};

export default config;
