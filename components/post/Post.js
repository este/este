// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Post.graphql';
import PostName from './PostName';
import Head from 'next/head';
import EditMainNav from '../EditMainNav';
import PostChild from './PostChild';
import PostText from './PostText';

type PostProps = {|
  theme: Theme,
  data: generated.Post,
|};

class Post extends React.PureComponent<PostProps> {
  // Next.js Head title requires string.
  static getTitle(post): string {
    if (post.name != null) return post.name;
    if (post.text != null) return post.text;
    return post.id;
  }

  static renderByType(post) {
    const { type } = post;
    switch (type) {
      case 'TEXT':
        return (
          <PostText id={post.id} text={post.text} draftText={post.draftText} />
        );
      case 'IMAGE':
        return null;
      case 'CHILDREN':
        if (post.children == null) return null;
        return post.children.map(child => (
          // $FlowFixMe https://github.com/facebook/relay/issues/2316
          <PostChild data={child} key={child.id} />
        ));
      default:
        // eslint-disable-next-line no-unused-expressions
        (type: empty);
    }
  }

  render() {
    const {
      theme,
      data: { post },
    } = this.props;
    if (post == null) return null;
    const title = Post.getTitle(post);
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <EditMainNav web={post.web} postParents={post.parents} />
        <View style={theme.styles.post}>
          {post.name != null && (
            <PostName postId={post.id} defaultValue={post.name} />
          )}
          {Post.renderByType(post)}
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
        text @__clientField(handle: "draftText")
        draftText
        type
        # childrenOrder
        web {
          id
          name
        }
        parents {
          id
          name
        }
        children {
          id
          ...PostChild
        }
      }
    }
  `,
);
