// @flow
import type { CreatePostMutationVariables } from './__generated__/CreatePostMutation.graphql';
import type { PostFormFields } from '../reducers/posts';
import type { Id } from '../types';
import createCommit from './createCommit';
import { ConnectionHandler } from 'relay-runtime';
import { graphql } from 'react-relay';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      # Don't know what to return? Check data/schema.graphql.
      # Remember, ask for data needed for the updater.
      edge {
        node {
          ...Post_post
        }
      }
    }
  }
`;

const updater = (store, viewerId, edge) => {
  const userProxy = store.get(viewerId);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    'Posts_allPosts',
    // https://github.com/facebook/relay/issues/1808#issuecomment-304519883
    { orderBy: 'createdAt_DESC' },
  );
  ConnectionHandler.insertEdgeBefore(connection, edge);
};

const commit = (environment: Object, viewerId: Id, fields: PostFormFields) =>
  createCommit(environment, {
    mutation,
    variables: ({
      input: {
        ...fields,
        clientMutationId: Date.now().toString(32),
      },
    }: CreatePostMutationVariables),
    updater: store => {
      const payload = store.getRootField('createPost');
      const edge = payload.getLinkedRecord('edge');
      updater(store, viewerId, edge);
    },
  });

export default { commit };
