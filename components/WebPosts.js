// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebPosts.graphql';
import WebPostsItem from './WebPostsItem';

type WebPostsProps = {|
  data: generated.WebPosts,
|};

class WebPosts extends React.PureComponent<WebPostsProps> {
  static isPage = post => post.parents == null || post.parents.length === 0;

  render() {
    const {
      data: { posts },
    } = this.props;
    if (posts == null) return null;
    const pages = posts.filter(WebPosts.isPage);
    // TODO: Add list of reusable named components.
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    return pages.map(page => <WebPostsItem data={page} key={page.id} />);
  }
}

export default createFragmentContainer(
  WebPosts,
  graphql`
    fragment WebPosts on Web {
      posts(orderBy: updatedAt_DESC) {
        id
        parents {
          id
        }
        ...WebPostsItem
      }
    }
  `,
);
