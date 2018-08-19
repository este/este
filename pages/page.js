// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import PageComponent from '../components/Page';
import AppPage from '../components/app/AppPage';

const Page = props => {
  return (
    <AppPage requireAuth data={props.data}>
      <PageComponent data={props.data} />
    </AppPage>
  );
};

export default app(Page, {
  query: graphql`
    query pageQuery($id: ID!, $isPage: Boolean!) {
      ...AppPage @arguments(isPage: $isPage)
      ...Page @arguments(id: $id)
    }
  `,
  mapQueryVariables: variables => ({ ...variables, isPage: true }),
});
