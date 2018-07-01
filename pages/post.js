// @flow
import * as React from 'react';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import * as generated from './__generated__/postQuery.graphql';
import Error from 'next/error';
import AppPage from '../components/app/AppPage';
import PostComponent from '../components/post/Post';

const Post = props => {
  const { post }: generated.postQueryResponse = props.data;
  if (!post) return <Error statusCode={404} />;
  return (
    <AppPage requireAuth withoutHeader withoutFooter data={props.data}>
      <PostComponent data={props.data} />
    </AppPage>
  );
};

export default app(Post, {
  query: graphql`
    query postQuery($id: ID!) {
      post(id: $id) {
        id
      }
      ...AppPage
      ...Post @arguments(id: $id)
    }
  `,
});
