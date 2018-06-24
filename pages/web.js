// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/webQuery.graphql';
import Error from 'next/error';
import AppPage from '../components/app/AppPage';
import WebComponent from '../components/web/Web';

const Web = props => {
  const { web }: generated.webQueryResponse = props.data;
  if (!web) return <Error statusCode={404} />;
  return (
    <AppPage requireAuth withoutHeader withoutFooter data={props.data}>
      <WebComponent data={props.data} />
    </AppPage>
  );
};

export default app(Web, {
  query: graphql`
    query webQuery($id: ID!) {
      web(id: $id) {
        id
      }
      ...AppPage
      ...Web @arguments(id: $id)
    }
  `,
});
