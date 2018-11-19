// @flow
import { graphql } from 'react-relay';
import type { SetPageTitleMutation } from './__generated__/SetPageTitleMutation.graphql';
import useMutation from '../hooks/useMutation';
import validateSetPageTitle from '../validate/validateSetPageTitle';

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

export function useSetPageTitleMutation() {
  return useMutation<SetPageTitleMutation, 'setPageTitle'>(
    config,
    'setPageTitle',
    validateSetPageTitle,
  );
}
