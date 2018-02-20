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
import CreateWeb from '../components/CreateWeb';
import Webs from '../components/Webs';
import { graphql } from 'react-relay';
import IsAuthenticated from '../components/IsAuthenticated';
import * as generated from './__generated__/pagesQuery.graphql';

const Authenticated = ({ data }) => (
  <Box>
    <Heading size={1}>
      <FormattedMessage
        defaultMessage="Manage your webs"
        id="index.manageYourWebs"
      />
    </Heading>
    <Webs data={data} />
    <CreateWeb />
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

const Index = props => {
  const data: generated.pagesQueryResponse = props.data;
  return (
    <Page title={props.intl.formatMessage(titles.index)}>
      <Heading size={3}>Este</Heading>
      <IsAuthenticated>
        {({ isAuthenticated }) =>
          isAuthenticated ? <Authenticated data={data} /> : <NotAuthenticated />
        }
      </IsAuthenticated>
    </Page>
  );
};

export default app(Index, {
  query: graphql`
    query pagesQuery($isAuthenticated: Boolean!) {
      ...Webs @arguments(isAuthenticated: $isAuthenticated)
    }
  `,
  queryVariables: args =>
    ({
      isAuthenticated: args.isAuthenticated,
    }: generated.pagesQueryVariables),
});
