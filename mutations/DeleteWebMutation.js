// @flow
import { graphql } from 'react-relay';
import type { DeleteWebMutation } from './__generated__/DeleteWebMutation.graphql';
import useMutation from '../hooks/useMutation';

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

export function useDeleteWebMutation() {
  return useMutation<DeleteWebMutation, 'deleteWeb'>(config, 'deleteWeb');
}
