// @flow
import { graphql } from 'react-relay';
import type { CreateWebMutation } from './__generated__/CreateWebMutation.graphql';
import useMutation from '../hooks/useMutation';
import validateCreateWeb from '../validate/validateCreateWeb';

const config = {
  mutation: graphql`
    mutation CreateWebMutation($input: CreateWebInput!) {
      createWeb(input: $input) {
        pageId
        errors {
          name
          pageTitle
        }
      }
    }
  `,
};

export function useCreateWebMutation() {
  return useMutation<CreateWebMutation, 'createWeb'>(
    config,
    'createWeb',
    validateCreateWeb,
  );
}
