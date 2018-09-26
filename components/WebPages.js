// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebPages.graphql';
import WebPagesItem from './WebPagesItem';

type WebPagesProps = {|
  data: generated.WebPages,
|};

class WebPages extends React.PureComponent<WebPagesProps> {
  render() {
    const { data } = this.props;
    if (data.pages == null) return null;
    return data.pages.map(page => {
      // $FlowFixMe https://github.com/facebook/relay/issues/2316
      return <WebPagesItem data={page} key={page.id} />;
    });
  }
}

export default createFragmentContainer(
  WebPages,
  graphql`
    fragment WebPages on Web {
      pages(orderBy: updatedAt_DESC) {
        id
        ...WebPagesItem
      }
    }
  `,
);
