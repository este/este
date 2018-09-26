// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Webs.graphql';
import WebsItem from './WebsItem';

type WebsProps = {|
  data: generated.Webs,
|};

class Webs extends React.PureComponent<WebsProps> {
  render() {
    const { data } = this.props;
    const webs = data.me?.webs;
    if (webs == null) return null;
    return webs.map(web => {
      // $FlowFixMe https://github.com/facebook/relay/issues/2316
      return <WebsItem data={web} key={web.id} />;
    });
  }
}

export default createFragmentContainer(
  Webs,
  graphql`
    fragment Webs on Query {
      me {
        # updatedAt is not updated for the whole web content, so use createAt.
        webs(orderBy: createdAt_DESC) {
          id
          ...WebsItem
        }
      }
    }
  `,
);
