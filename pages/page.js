// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/pageQuery.graphql';
import Error from 'next/error';
import AppPage from '../components/app/AppPage';
import PageComponent from '../components/page/Page';

const Page = props => {
  const { page }: generated.pageQueryResponse = props.data;
  if (!page) return <Error statusCode={404} />;
  return (
    <AppPage requireAuth withoutHeader withoutFooter data={props.data}>
      <PageComponent data={props.data} />
    </AppPage>
  );
};

export default app(Page, {
  query: graphql`
    query pageQuery($id: ID!) {
      page(id: $id) {
        id
      }
      ...AppPage
      ...Page @arguments(id: $id)
    }
  `,
});
