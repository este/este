// @flow
import type { CreatePostMutationVariables } from './__generated__/CreatePostMutation.graphql';
import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        text
      }
    }
  }
`;

// fakt vracetet asi createPostMutation, ten commit je divnej,ok
// snad to nikde nepouziva object, ok
const commit = (environment: Object, text: string) =>
  commitMutation(environment, {
    mutation,
    variables: ({
      input: {
        text,
        // https://github.com/facebook/relay/issues/1556#issuecomment-283424459
        clientMutationId: '0',
      },
    }: CreatePostMutationVariables),
  });

// Not sure why Relay Modern examples exports object with commit method.
export default { commit };
