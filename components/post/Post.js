// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import PostMarkdown from './PostMarkdown';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Post.graphql';
import PostName from './PostName';
import Head from 'next/head';
import EditMainNav from '../EditMainNav';

type PostProps = {|
  theme: Theme,
  data: generated.Post,
|};

class Post extends React.PureComponent<PostProps> {
  render() {
    const {
      theme,
      data: { post },
    } = this.props;
    if (post == null) return null;
    const { web } = post;
    return (
      <>
        <Head>
          <title>{post.name}</title>
        </Head>
        <EditMainNav webId={web.id} webName={web.name} />
        <View style={theme.styles.post}>
          {post.name != null && (
            <PostName postId={post.id} defaultValue={post.name} />
          )}

          <PostMarkdown />
        </View>
      </>
    );
  }
}

export default createFragmentContainer(
  withTheme(Post),
  graphql`
    fragment Post on Query @argumentDefinitions(id: { type: "ID!" }) {
      post(id: $id) {
        id
        name
        web {
          id
          name
        }
      }
    }
  `,
);
