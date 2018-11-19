// @flow
import { graphql } from 'react-relay';
import type { SetThemeMutation } from './__generated__/SetThemeMutation.graphql';
import useMutation from '../hooks/useMutation';

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

export function useSetThemeMutation() {
  return useMutation<SetThemeMutation, 'setTheme'>(config, 'setTheme');
}
