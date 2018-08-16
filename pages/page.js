// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import AppPage from '../components/app/AppPage';
import Editor from '../components/Editor';

const Page = props => {
  return (
    <AppPage requireAuth withoutHeader withoutFooter data={props.data}>
      <Editor data={props.data} />
    </AppPage>
  );
};

export default app(Page, {
  query: graphql`
    query pageQuery($id: ID!) {
      ...AppPage
      ...Editor @arguments(id: $id)
    }
  `,
});
