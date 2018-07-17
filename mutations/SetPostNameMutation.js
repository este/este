// @flow
import { graphql } from 'react-relay';
import type { Commit, Errors } from '../components/core/withMutation';
import * as generated from './__generated__/SetPostNameMutation.graphql';

export type SetPostNameCommit = Commit<
  generated.SetPostNameInput,
  generated.SetPostNameMutationResponse,
>;

export type SetPostNameErrors = Errors<
  generated.SetPostNameMutationResponse,
  'setPostName',
>;

const config = {
  mutation: graphql`
    mutation SetPostNameMutation($input: SetPostNameInput!) {
      setPostName(input: $input) {
        # Payload "post { name }" updates fragments with post name. Perfect.
        # post {
        #   name
        # }
        errors {
          name
        }
      }
    }
  `,
};

export default config;
