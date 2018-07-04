// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebPosts.graphql';
import WebPostsItem from './WebPostsItem';

type WebPostsProps = {|
  data: generated.WebPosts,
|};

class WebPosts extends React.PureComponent<WebPostsProps> {
  render() {
    const {
      data: { posts },
    } = this.props;
    if (posts == null) return null;
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    return posts.map(page => <WebPostsItem data={page} key={page.id} />);
  }
}

export default createFragmentContainer(
  WebPosts,
  graphql`
    fragment WebPosts on Web {
      posts(orderBy: updatedAt_DESC, where: { name_not: null }) {
        id
        ...WebPostsItem
      }
    }
  `,
);
