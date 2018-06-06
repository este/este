// @flow
import * as React from 'react';
import app from '../components/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/editQuery.graphql';
import Error from 'next/error';
import Page from '../components/core/Page';
import Editor from '../components/editor';

const Edit = props => {
  const { web }: generated.editQueryResponse = props.data;
  if (!web) return <Error statusCode={404} />;
  return (
    <Page requireAuth title={web.name} data={props.data}>
      <Editor />
    </Page>
  );
};

export default app(Edit, {
  query: graphql`
    query editQuery($domain: String!) {
      web(domain: $domain) {
        name
      }
      ...Page
    }
  `,
});
