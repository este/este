// // @flow
// import * as React from 'react';
// import app from '../components/app';
// import A from '../components/core/A';
// import { graphql } from 'react-relay';
// import * as generated from './__generated__/webQuery.graphql';
// import Error from 'next/error';
// import AppPage from '../components/core/AppPage';
// // import Editor from '../components/editor/Editor';
//
// const Web = props => {
//   const { web }: generated.webQueryResponse = props.data;
//   if (!web) return <Error statusCode={404} />;
//   return (
//     <AppPage
//       requireAuth
//       hideFooter={true}
//       title={web.name}
//       data={props.data}
//       // mainNavOptional={
//       //   <A href={{ pathname: '/web', query: { id: page.web.id } }} prefetch>
//       //     {page.web.name}
//       //   </A>
//       // }
//     >
//       {/* <Editor data={props.data} /> */}
//     </AppPage>
//   );
// };
//
// export default app(Web, {
//   query: graphql`
//     query webQuery($id: ID!) {
//       web(id: $id) {
//         name
//       }
//       ...AppPage
//       # ...Editor @arguments(pageId: $pageId)
//     }
//   `,
// });
