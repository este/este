// @flow
import * as React from 'react';
import app from '../components/app/app';
import A from '../components/core/A';
import { graphql } from 'react-relay';
import * as generated from './__generated__/webQuery.graphql';
import Error from 'next/error';
import AppPage from '../components/app/AppPage';
// import PageComponent from '../components/page/Page';

const Web = props => {
  const { web }: generated.webQueryResponse = props.data;
  if (!web) return <Error statusCode={404} />;
  return (
    <AppPage
      requireAuth
      hideFooter
      title={web.name}
      data={props.data}
      mainNavOptional={
        <A href={{ pathname: '/web', query: { id: web.id } }} prefetch>
          {web.name}
        </A>
      }
    >
      {/* <PageComponent data={props.data} /> */}
    </AppPage>
  );
};

export default app(Web, {
  query: graphql`
    query webQuery($id: ID!) {
      web(id: $id) {
        id
        name
      }
      ...AppPage
      # ...Page @arguments(id: $id)
    }
  `,
});
