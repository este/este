// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Commit } from '../components/core/Mutation';
import * as generated from './__generated__/UpdateUserMutation.graphql';

const mutation = graphql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        themeName
      }
    }
  }
`;

const commit: Commit<
  generated.UpdateUserInput,
  generated.UpdateUserMutationResponse,
> = (environment, input, onCompleted, onError) =>
  commitMutation(environment, {
    mutation,
    // $FlowFixMe Wrong libdef.
    variables: { input },
    onCompleted,
    onError,
  });

export default { commit };
