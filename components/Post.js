// @flow
import type { Post_post } from './__generated__/Post_post.graphql';
import Box from '../components/Box';
import Button from '../components/Button';
import Set from '../components/Set';
import Text from '../components/Text';
import { FormattedRelative } from 'react-intl';
import { createFragmentContainer, graphql } from 'react-relay';

const RemovePostButton = () =>
  <Button
    color="warning"
    marginVertical={0}
    // onClick={deletePost}
    paddingHorizontal={0}
    size={-1}
  >
    delete
  </Button>;

// const deletePostMutation = gql`
//   mutation deletePost($id: ID!) {
//     deletePost(id: $id) {
//       id
//     }
//   }
// `;
//
// const DeletePostWithData = graphql(deletePostMutation, {
//   props: ({ mutate, ownProps: { id } }) => ({
//     deletePost: () =>
//       mutate({
//         variables: { id },
//         update: (proxy, { data: { deletePost } }) => {
//           const data = proxy.readQuery({ query: allPostsQuery });
//           const idx = data.allPosts.findIndex(
//             post => post.id === deletePost.id,
//           );
//           data.allPosts.splice(idx, 1);
//           proxy.writeQuery({ query: allPostsQuery, data });
//         },
//       }),
//   }),
// })(RemovePostButton);

const Post = ({ post }: { post: Post_post }) =>
  <Box marginBottom={1}>
    <Set marginBottom={0}>
      <Text color="gray" size={-1}>
        <FormattedRelative value={post.createdAt} />
      </Text>
      <RemovePostButton id={post.id} />
    </Set>
    <Text>
      {post.text}
    </Text>
  </Box>;

export default createFragmentContainer(
  Post,
  graphql`
    fragment Post_post on Post {
      createdAt
      id
      text
    }
  `,
);
