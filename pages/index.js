// @flow
import * as React from 'react';
import { titles } from '../lib/sitemap';
import Page from '../components/Page';
import Heading from '../components/Heading';
import app, { type QueryVariables } from '../components/app';
import A from '../components/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/Blockquote';
import P from '../components/P';
import Box from '../components/Box';
import CreateWeb from '../components/CreateWeb';
import WebList from '../components/WebList';
import { graphql } from 'react-relay';
import { type pagesQueryResponse } from './__generated__/pagesQuery.graphql';
import IsAuthenticated from '../components/IsAuthenticated';

const NotAuthenticated = () => (
  <Box>
    <P>
      <A href={{ pathname: '/sign-in' }}>
        <FormattedMessage defaultMessage="Create web" id="index.createWeb" />
      </A>
    </P>
    <Blockquote
      source="Friedrich Hayek"
      href="https://en.wikipedia.org/wiki/Friedrich_Hayek"
    >
      The curious task of economics is to demonstrate to men how little they
      really know about what they imagine they can design.
    </Blockquote>
  </Box>
);

export const ManageYourWebsMessage = () => (
  <FormattedMessage
    defaultMessage="Manage your webs"
    id="index.manageYourWebs"
  />
);

const Authenticated = ({ viewer, userId }) => (
  <Box>
    <Heading size={1}>
      <ManageYourWebsMessage />
    </Heading>
    {/* $FlowFixMe viewer is {||} but {} is required. Probably libdef bug. */}
    <WebList viewer={viewer} userId={userId} />
    <CreateWeb userId={userId} />
  </Box>
);

const Index = ({ data, intl }) => {
  const { viewer }: pagesQueryResponse = data;
  return (
    <Page title={intl.formatMessage(titles.index)}>
      <Heading size={3}>Este</Heading>
      <IsAuthenticated>
        {({ userId }) =>
          userId != null ? (
            <Authenticated viewer={viewer} userId={userId} />
          ) : (
            <NotAuthenticated />
          )
        }
      </IsAuthenticated>
    </Page>
  );
};

export const queryFilters = (userId: ?string) => ({
  filter: { owner: { id: userId } },
});

export default app(Index, {
  query: graphql`
    query pagesQuery($filter: WebFilter, $isAuthenticated: Boolean!) {
      viewer {
        ...WebList_viewer
      }
    }
  `,
  queryVariables: ({ isAuthenticated, userId }: QueryVariables<{}>) => ({
    ...queryFilters(userId),
    isAuthenticated,
  }),
});
