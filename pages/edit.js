// @flow
import * as React from 'react';
import app from '../components/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/editQuery.graphql';
import Error from 'next/error';
import Page from '../components/core/Page';
// import Editor from '../components/editor/Editor';

const Edit = props => {
  return null;
  // const { web }: generated.editQueryResponse = props.data;
  // if (!web) return <Error statusCode={404} />;
  // return (
  //   <Page
  //     // header={false}
  //     footer={false}
  //     requireAuth
  //     // title={web.name}
  //     title="todo"
  //     data={props.data}
  //   >
  //     {/* <Editor data={props.data} /> */}
  //   </Page>
  // );
};

export default app(Edit, {
  query: graphql`
    # query editQuery($pageId: String!) {
    query editQuery {
      # web(pageId: $pageId) {
      #   name
      # }
      ...Page
      # ...Editor @arguments(pageId: $pageId)
    }
  `,
});
