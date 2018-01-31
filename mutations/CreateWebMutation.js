// // @flow
// import { graphql, commitMutation } from 'react-relay';
// import type { Commit } from './types';
// import type {
//   CreateWebMutationVariables,
//   CreateWebMutationResponse,
// } from './__generated__/CreateWebMutation.graphql';
// import { ConnectionHandler } from 'relay-runtime';
// import { queryFilters } from '../pages/index';
//
// const mutation = graphql`
//   mutation CreateWebMutation($input: CreateWebInput!) {
//     createWeb(input: $input) {
//       # Request payload data needed for store update.
//       edge {
//         node {
//           ...WebListItem_web
//         }
//       }
//     }
//   }
// `;
//
// const sharedUpdater = (store, edge, userId) => {
//   const viewerProxy = store.get('viewer-fixed');
//   const connection = ConnectionHandler.getConnection(
//     viewerProxy,
//     'WebList_allWebs',
//     {
//       ...queryFilters(userId),
//       orderBy: 'createdAt_ASC',
//     },
//   );
//   // https://github.com/facebook/relay/issues/1808#issuecomment-304519883
//   if (!connection) {
//     // eslint-disable-next-line no-console
//     console.warn('Undefined connection. Check getConnection arguments.');
//   }
//   ConnectionHandler.insertEdgeAfter(connection, edge);
// };
//
// type CommitWithArgs = (
//   userId: string,
// ) => Commit<CreateWebMutationVariables, CreateWebMutationResponse>;
//
// const commit: CommitWithArgs = userId => (
//   environment,
//   variables,
//   onCompleted,
//   onError,
// ) =>
//   commitMutation(environment, {
//     mutation,
//     variables,
//     onCompleted,
//     onError,
//     updater: store => {
//       const payload = store.getRootField('createWeb');
//       const edge = payload.getLinkedRecord('edge');
//       sharedUpdater(store, edge, userId);
//     },
//   });
//
// export default { commit };
