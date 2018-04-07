// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import type {
  UpdateUserMutationVariables,
  UpdateUserMutationResponse,
} from './__generated__/UpdateUserMutation.graphql';

const mutation = graphql`
  mutation UpdateUserMutation($themeName: String!) {
    updateUser(themeName: $themeName) {
      user {
        themeName
      }
    }
  }
`;

const commit: Commit<
  UpdateUserMutationVariables,
  UpdateUserMutationResponse,
> = (environment, variables, onCompleted, onError) =>
  commitMutation(environment, {
    mutation,
    // $FlowFixMe Wrong libdef.
    variables,
    onCompleted,
    onError,
  });

export default { commit };
