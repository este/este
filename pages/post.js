// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import AppPage from '../components/app/AppPage';
import PostComponent from '../components/Post';

const Post = props => {
  return (
    <AppPage requireAuth withoutHeader withoutFooter data={props.data}>
      <PostComponent data={props.data} />
    </AppPage>
  );
};

export default app(Post, {
  query: graphql`
    query postQuery($id: ID!) {
      ...AppPage
      ...Post @arguments(id: $id)
    }
  `,
});
