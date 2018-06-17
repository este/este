// @flow
import * as React from 'react';
import app from '../components/app';
import A from '../components/core/A';
import { graphql } from 'react-relay';
import * as generated from './__generated__/pageQuery.graphql';
import Error from 'next/error';
import AppPage from '../components/AppPage';
import PageComponent from '../components/page/Page';

const Page = props => {
  const { page }: generated.editQueryResponse = props.data;
  if (!page) return <Error statusCode={404} />;
  return (
    <AppPage
      requireAuth
      hideFooter
      title={page.title}
      data={props.data}
      mainNavOptional={
        <A href={{ pathname: '/web', query: { id: page.web.id } }} prefetch>
          {page.web.name}
        </A>
      }
    >
      <PageComponent data={props.data} />
    </AppPage>
  );
};

export default app(Page, {
  query: graphql`
    query pageQuery($id: ID!) {
      page(id: $id) {
        title
        web {
          id
          name
        }
      }
      ...AppPage
      ...Page @arguments(id: $id)
    }
  `,
});
