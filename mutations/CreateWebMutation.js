// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import * as generated from './__generated__/CreateWebMutation.graphql';

export type CreateWebCommit = Commit<
  generated.CreateWebInput,
  generated.CreateWebMutationResponse,
>;

export type CreateWebErrors = Errors<
  generated.CreateWebMutationResponse,
  'createWeb',
>;

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
