// @flow
import * as React from 'react';
import app from '../components/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/editQuery.graphql';
import type { EditQuery } from '../server/sitemap';
import Error from 'next/error';
import Editor from '../components/editor/Editor';

const Edit = props => {
  const { web }: generated.editQueryResponse = props.data;
  if (!web) return <Error statusCode={404} />;
  return <Editor name={web.name} />;
};

export default app(Edit, {
  requireAuth: true,
  query: graphql`
    query editQuery($domain: String!) {
      web(domain: $domain) {
        name
      }
    }
  `,
  queryVariables: args =>
    ({
      domain: (args.urlQuery: EditQuery).domain,
    }: generated.editQueryVariables),
});
