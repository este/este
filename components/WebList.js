// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Box from './Box';
import type { WebList_viewer } from './__generated__/WebList_viewer.graphql';
import WebListItem from './WebListItem';

type Props = {
  viewer: WebList_viewer,
  userId: string,
};

// Why edges and nodes? Because Relay does not mix meta data with data.
// https://facebook.github.io/relay/docs/graphql-connections.html
// Why "edges &&" and "edge &&" existence checking?
// Because schema can be and will be updated. With such approach, not yet
// updated client code will not fail. Babel 7 optional chaining operator ftw.

const WebList = ({ viewer, userId }: Props) => (
  <Box>
    {viewer.allWebs &&
      viewer.allWebs.edges &&
      viewer.allWebs.edges.map(
        edge =>
          edge && (
            <WebListItem
              web={edge.node}
              viewer={viewer}
              key={edge.node.id}
              userId={userId}
            />
          ),
      )}
  </Box>
);

// Always use first or last on connections.
// https://github.com/facebook/relay/issues/1201#issuecomment-224366807
// TODO: Remove Flow workaround fields.
// https://github.com/este/este/issues/1442
export default createFragmentContainer(
  WebList,
  graphql`
    fragment WebList_viewer on Viewer {
      allWebs(filter: $filter, orderBy: createdAt_ASC, first: 100)
        @connection(key: "WebList_allWebs")
        @include(if: $isAuthenticated) {
        edges {
          node {
            id
            updatedAt
            domain
            owner {
              id
            }
            name
            ...WebListItem_web
          }
        }
      }
    }
  `,
);
