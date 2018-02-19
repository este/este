// @flow
import * as React from 'react';
import { titles } from '../server/sitemap';
import Page from '../components/Page';
import Heading from '../components/Heading';
import app from '../components/app';
import A from '../components/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/Blockquote';
import P from '../components/P';
import Box from '../components/Box';
// import CreateWeb from '../components/CreateWeb';
import Webs from '../components/Webs';
import { graphql } from 'react-relay';
import IsAuthenticated from '../components/IsAuthenticated';
import * as generated from './__generated__/pagesQuery.graphql';

const Authenticated = ({ webs }) => (
  <Box>
    <Heading size={1}>
      <FormattedMessage
        defaultMessage="Manage your webs"
        id="index.manageYourWebs"
      />
    </Heading>
    <Webs data={webs} />
    {/* <WebList viewer={viewer} userId={userId} />
    <CreateWeb userId={userId} /> */}
  </Box>
);

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

const Index = ({ data, intl }) => {
  const { webs }: generated.pagesQueryResponse = data;
  return (
    <Page title={intl.formatMessage(titles.index)}>
      <Heading size={3}>Este</Heading>
      <IsAuthenticated>
        {({ isAuthenticated }) =>
          isAuthenticated ? <Authenticated webs={webs} /> : <NotAuthenticated />
        }
      </IsAuthenticated>
    </Page>
  );
};

export default app(Index, {
  query: graphql`
    query pagesQuery($isAuthenticated: Boolean!) {
      webs @include(if: $isAuthenticated) {
        ...Webs
      }
    }
  `,
  queryVariables: ({ isAuthenticated }) =>
    ({ isAuthenticated }: generated.pagesQueryVariables),
});
