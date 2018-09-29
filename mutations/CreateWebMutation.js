// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import type { CreateWebMutation } from './__generated__/CreateWebMutation.graphql';

export type CreateWebCommit = Commit<CreateWebMutation>;
export type CreateWebErrors = Errors<CreateWebMutation, 'createWeb'>;

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

export default config;
