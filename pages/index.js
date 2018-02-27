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
      <A href={{ pathname: '/sign-in', query: { redirectUrl: '/' } }}>
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
  return (
    <Page title={props.intl.formatMessage(titles.index)} data={props.data}>
      {isAuthenticated => {
        return (
          <React.Fragment>
            <Heading size={3}>Este</Heading>
            {isAuthenticated ? (
              <Authenticated data={props.data} />
            ) : (
              <NotAuthenticated />
            )}
          </React.Fragment>
        );
      }}
    </Page>
  );
};

export default app(Index, {
  query: graphql`
    query pagesQuery {
      ...Page
      ...Webs
    }
  `,
});
