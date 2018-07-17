// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Post.graphql';
import PostName from './PostName';
import Head from 'next/head';
import EditMainNav from './EditMainNav';
import PostChild from './PostChild';
import PostText from './PostText';
import PostParents from './PostParents';

type PostProps = {|
  theme: Theme,
  data: generated.Post,
|};

class Post extends React.PureComponent<PostProps> {
  // Next.js Head title requires string.
  static getTitle(post): string {
    if (post.draftName.length > 0) return post.draftName;
    if (post.text != null) return post.text.slice(0, 256);
    return post.id;
  }

  static renderByType(post) {
    const { type } = post;
    switch (type) {
      case 'TEXT':
        // $FlowFixMe https://github.com/facebook/relay/issues/2316
        return <PostText data={post} />;
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
    return (
      <>
        <Head>
          <title>{Post.getTitle(post)}</title>
        </Head>
        {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
        <EditMainNav data={post.web} />
        <View style={theme.styles.post}>
          {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
          <PostParents data={post} />
          {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
          <PostName data={post} />
          {Post.renderByType(post)}
        </View>
      </>
    );
  }
}

export default createFragmentContainer(
  withTheme(Post),
  // https://github.com/relayjs/eslint-plugin-relay/issues/35
  // eslint-disable-next-line relay/unused-fields
  graphql`
    fragment Post on Query @argumentDefinitions(id: { type: "ID!" }) {
      post(id: $id) {
        id
        name @__clientField(handle: "draftName")
        draftName
        text
        type
        web {
          ...EditMainNav
        }
        ...PostParents
        ...PostName
        # Interesting, ...PostText must be defined before ...PostChild,
        # otherwise: Error: There can be only one fragment named "PostText".
        ...PostText
        children {
          id
          ...PostChild
        }
      }
    }
  `,
);
