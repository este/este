// @flow
import type { Post_post } from './__generated__/Post_post.graphql';
import type { Post_viewer } from './__generated__/Post_viewer.graphql';
import Box from './Box';
import DeletePostButton from './DeletePostButton';
import Set from './Set';
import Text from './Text';
import { FormattedRelative } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';

// As for naming, don't start with PostItem or PostListItem, it's just a Post.
// Later, we can have PostDetail, PostPage, PostPreview, PostEdit, PostWhatever.
const Post = ({ post, viewer }: { post: Post_post, viewer: Post_viewer }) =>
  <Box marginBottom={1}>
    <Set marginBottom={0}>
      <Text color="gray" size={-1}>
        <FormattedRelative value={post.createdAt} />
      </Text>
      <DeletePostButton id={post.id} viewerId={viewer.id} />
    </Set>
    <Text>
      {post.text}
    </Text>
  </Box>;

export default createFragmentContainer(Post, {
  post: graphql`
    fragment Post_post on Post {
      createdAt
      id
      text
    }
  `,
  viewer: graphql`
    fragment Post_viewer on Viewer {
      id
    }
  `,
});
