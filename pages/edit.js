// @flow
import * as React from 'react';
import app, { type QueryVariables } from '../components/app';
import { graphql } from 'react-relay';
import type { editQueryResponse } from './__generated__/editQuery.graphql';
import type { EditQuery } from '../lib/sitemap';
import Error from 'next/error';
import Editor from '../components/Editor';

const Edit = ({ data }) => {
  const { viewer: { Web } }: editQueryResponse = data;
  // Why Web is maybe type? https://flow.org/en/docs/types/maybe
  // Because we never know whether data were removed, user lost permissions,
  // or something else happen. App also can't generally decide which data are
  // considered critical and which are missing due to the schema change
  // for example. Therefore, it's up to the page to decide. In this case, we
  // return Next.js error page until we will have something better.
  if (!Web) return <Error statusCode={404} />;

  return <Editor name={Web.name} />;
};

export default app(Edit, {
  requireAuth: true,
  query: graphql`
    query editQuery($domain: String) {
      viewer {
        Web(domain: $domain) {
          name
        }
      }
    }
  `,
  queryVariables: ({ query: { domain } }: QueryVariables<EditQuery>) => ({
    domain,
  }),
});
