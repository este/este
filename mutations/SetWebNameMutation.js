// @flow
import { graphql } from 'react-relay';
import type { SetWebNameMutation } from './__generated__/SetWebNameMutation.graphql';
import useMutation from '../hooks/useMutation';
import validateSetWebName from '../validate/validateSetWebName';

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

export function useSetWebNameMutation() {
  return useMutation<SetWebNameMutation, 'setWebName'>(
    config,
    'setWebName',
    validateSetWebName,
  );
}
