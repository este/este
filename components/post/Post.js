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
import Block from '../core/Block';

type PostProps = {|
  theme: Theme,
  data: generated.Post,
|};

class Post extends React.PureComponent<PostProps> {
  // Next.js Head title requires string.
  static getTitle(post): string {
    if (post.name != null) return post.name;
    if (post.contentText != null) return post.contentText;
    return post.id;
  }

  // eslint-disable-next-line class-methods-use-this
  renderPostChild({ id, contentType, contentText }) {
    if (!contentType) return null;
    switch (contentType) {
      case 'TEXT':
        return (
          contentText != null && (
            <Block key={id}>
              <PostMarkdown defaultValue={contentText} />
            </Block>
          )
        );
      case 'IMAGE':
        return null;
      case 'CHILDREN':
        // TODO: Just Name as link.
        return null;
      default:
        // eslint-disable-next-line no-unused-expressions
        (contentType: empty);
        return null;
    }
  }

  renderPost({ contentType, contentText, contentChildren }) {
    if (!contentType) return null;
    switch (contentType) {
      case 'TEXT':
        return (
          contentText != null && <PostMarkdown defaultValue={contentText} />
        );
      case 'IMAGE':
        return null;
      case 'CHILDREN':
        return (
          contentChildren != null &&
          contentChildren.map(child => {
            return this.renderPostChild(child);
          })
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        (contentType: empty);
        return null;
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
          {this.renderPost(post)}
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
        parents {
          id
          name
        }
        contentType
        contentChildren {
          id
          name
          contentType
          contentText
        }
        # contentChildrenOrder
        contentText
        # contentTextFormat
        # contentImage {
        #   id
        # }
      }
    }
  `,
);
