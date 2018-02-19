// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Box from './Box';
import * as generated from './__generated__/Webs.graphql';
import WebsItem from './WebsItem';

type Props = {
  data: generated.Webs,
};

class Webs extends React.PureComponent<Props> {
  render() {
    return (
      <Box>
        {this.props.data.edges.map(
          edge => edge && <WebsItem data={edge.node} key={edge.node.id} />,
        )}
      </Box>
    );
  }
}

export default createFragmentContainer(
  Webs,
  graphql`
    fragment Webs on WebConnection {
      edges {
        node {
          id
          ...WebsItem
        }
      }
    }
  `,
);
