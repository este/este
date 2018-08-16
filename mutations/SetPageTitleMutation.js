// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import * as generated from './__generated__/SetPageTitleMutation.graphql';

export type SetPageTitleCommit = Commit<
  generated.SetPageTitleInput,
  generated.SetPageTitleMutationResponse,
>;

export type SetPageTitleErrors = Errors<
  generated.SetPageTitleMutationResponse,
  'setPageTitle',
>;

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
