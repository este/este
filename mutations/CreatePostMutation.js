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

// function sharedUpdater(store, user, newEdge) {
//   const userProxy = store.get(user.id);
//   const conn = ConnectionHandler.getConnection(
//     userProxy,
//     'TodoList_todos',
//   );
//   ConnectionHandler.insertEdgeAfter(conn, newEdge);
// }
//
// let tempID = 0;
//
// function commit(
//   environment,
//   text,
//   user
// ) {
//   return commitMutation(
//     environment,
//     {
//       mutation,
//       variables: {
//         input: {
//           text,
//           clientMutationId: tempID++,
//         },
//       },
//       updater: (store) => {
//         const payload = store.getRootField('addTodo');
//         const newEdge = payload.getLinkedRecord('todoEdge');
//         sharedUpdater(store, user, newEdge);
//       },
//       optimisticUpdater: (store) => {
//         const id = 'client:newTodo:' + tempID++;
//         const node = store.create(id, 'Todo');
//         node.setValue(text, 'text');
//         node.setValue(id, 'id');
//         const newEdge = store.create(
//           'client:newEdge:' + tempID++,
//           'TodoEdge',
//         );
//         newEdge.setLinkedRecord(node, 'node');
//         sharedUpdater(store, user, newEdge);
//         const userProxy = store.get(user.id);
//         userProxy.setValue(
//           userProxy.getValue('totalCount') + 1,
//           'totalCount',
//         );
//       },
//     }
//   );
// }
