// @flow
import { graphql } from 'react-relay';
import type { Commit } from '../components/core/withMutation';
import * as generated from './__generated__/SetPostTextMutation.graphql';

export type SetPostTextCommit = Commit<
  generated.SetPostTextInput,
  generated.SetPostTextMutationResponse,
>;

const config = {
  mutation: graphql`
    mutation SetPostTextMutation($input: SetPostTextInput!) {
      setPostText(input: $input) {
        # By GraphQL design, every mutation has to return something.
        post {
          id
          # In this case, store is updated automatically on save.
          text
        }
      }
    }
  `,
};

export default config;
