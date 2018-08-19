// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import Editor from '../components/Editor';
import AppPage from '../components/app/AppPage';

const EditorPage = props => {
  return (
    <AppPage requireAuth isEditor data={props.data}>
      <Editor data={props.data} />
    </AppPage>
  );
};

export default app(EditorPage, {
  query: graphql`
    query editorQuery($id: ID!, $isPage: Boolean!) {
      ...AppPage @arguments(isPage: $isPage)
      ...Editor @arguments(id: $id)
    }
  `,
  mapQueryVariables: variables => ({ ...variables, isPage: true }),
});
