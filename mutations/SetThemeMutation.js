// @flow
import { graphql } from 'react-relay';
import type { Commit } from '../components/core/withMutation';
import * as generated from './__generated__/SetThemeMutation.graphql';

export type SetThemeCommit = Commit<
  generated.SetThemeInput,
  generated.SetThemeMutationResponse,
>;

const config = {
  mutation: graphql`
    mutation SetThemeMutation($input: SetThemeInput!) {
      setTheme(input: $input) {
        user {
          themeName
        }
      }
    }
  `,
};

export default config;
