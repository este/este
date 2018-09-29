// @flow
import { graphql } from 'react-relay';
import type { Commit } from '../components/core/withMutation';
import type { SetThemeMutation } from './__generated__/SetThemeMutation.graphql';

export type SetThemeCommit = Commit<SetThemeMutation>;

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
