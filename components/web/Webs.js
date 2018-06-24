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
    const { webs } = this.props.data;
    // https://medium.com/@steida/always-design-graphql-schema-for-further-changes-efc9dee5ceb9
    if (!webs) return null;
    return webs.edges.map(
      // $FlowFixMe Relay known haste related bug. Will be fixed soon.
      edge => edge && <WebsItem data={edge.node} key={edge.node.id} />,
    );
  }
}

export default createFragmentContainer(
  Webs,
  graphql`
    fragment Webs on Query
      @argumentDefinitions(first: { type: "Int!", defaultValue: 100 }) {
      webs(first: $first) @connection(key: "Webs_webs") {
        edges {
          node {
            id
            ...WebsItem
          }
        }
      }
    }
  `,
);
