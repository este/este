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
    const { me } = this.props.data;
    // https://graphql.org/learn/best-practices/#nullability
    if (!me) return null;
    const { webs } = me;
    if (!webs) return null;
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    return webs.map(web => <WebsItem data={web} key={web.id} />);
  }
}

export default createFragmentContainer(
  Webs,
  graphql`
    fragment Webs on Query {
      me {
        webs(orderBy: updatedAt_ASC) {
          id
          ...WebsItem
        }
      }
    }
  `,
);
