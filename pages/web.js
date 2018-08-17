// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import AppPage from '../components/app/AppPage';
import WebComponent from '../components/Web';

const Web = props => {
  return (
    <AppPage requireAuth data={props.data}>
      <WebComponent data={props.data} />
    </AppPage>
  );
};

export default app(Web, {
  query: graphql`
    query webQuery($id: ID!) {
      ...AppPage
      ...Web @arguments(id: $id)
    }
  `,
});
