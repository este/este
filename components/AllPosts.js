// @flow
import type { AllPosts_viewer } from './__generated__/AllPosts_viewer.graphql';
import Box from '../components/Box';
import Post from '../components/Post';
import { createFragmentContainer, graphql } from 'react-relay';

// Why 'edges &&'' and 'edge &&'' existence checking?
// https://github.com/facebook/relay/issues/1935
const AllPosts = ({ viewer }: { viewer: AllPosts_viewer }) =>
  <Box>
    {viewer.allPosts.edges &&
      viewer.allPosts.edges.map(
        edge => edge && <Post post={edge.node} key={edge.node.id} />,
      )}
  </Box>;

export default createFragmentContainer(
  AllPosts,
  graphql`
    fragment AllPosts_viewer on Viewer {
      allPosts(last: 100, orderBy: createdAt_DESC)
        # connection key: FileName_propName
        @connection(key: "AllPosts_allPosts") {
        edges {
          node {
            id
            ...Post_post
          }
        }
      }
    }
  `,
);
