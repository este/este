// @flow
import React from 'react';
import type { Posts_viewer } from './__generated__/Posts_viewer.graphql';
import Box from './Box';
import Post from './Post';
import { createFragmentContainer, graphql } from 'react-relay';

// Why edges and nodes? tldr; metadata
// https://www.learnrelay.org/connections/what-is-a-connection#nodes
// Why 'edges &&'' and 'edge &&'' existence checking?
// https://github.com/facebook/relay/issues/1935
const Posts = ({ viewer }: { viewer: Posts_viewer }) =>
  <Box>
    {viewer.allPosts.edges &&
      viewer.allPosts.edges.map(
        edge =>
          edge && <Post post={edge.node} viewer={viewer} key={edge.node.id} />,
      )}
  </Box>;

export default createFragmentContainer(
  Posts,
  graphql`
    fragment Posts_viewer on Viewer {
      allPosts(first: $first, orderBy: createdAt_DESC)
        @connection(key: "Posts_allPosts") {
        edges {
          node {
            id
            ...Post_post
          }
        }
      }
      # To understand what's happening here:
      # Post_viewer fragment will be attached to viewer.__fragments for Post.js
      ...Post_viewer
    }
  `,
);
