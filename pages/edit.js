// @flow
import * as React from 'react';
import app from '../components/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/editQuery.graphql';
import Error from 'next/error';
import Page from '../components/core/Page';
import Editor from '../components/editor/Editor';

const Edit = props => {
  const { page }: generated.editQueryResponse = props.data;
  if (!page) return <Error statusCode={404} />;
  return (
    <Page
      requireAuth
      title={page.title}
      // header={false}
      footer={false}
      data={props.data}
    >
      <Editor data={props.data} />
    </Page>
  );
};

export default app(Edit, {
  query: graphql`
    query editQuery($pageId: ID!) {
      page(pageId: $pageId) {
        title
      }
      ...Page
      ...Editor @arguments(pageId: $pageId)
    }
  `,
});
