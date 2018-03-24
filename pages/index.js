// @flow
import * as React from 'react';
import { titles } from '../components/app/sitemap';
import Page from '../components/core/Page';
import Heading from '../components/core/Heading';
import app from '../components/app';
import A from '../components/core/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/core/Blockquote';
import P from '../components/core/P';
import CreateWeb from '../components/CreateWeb';
import Webs from '../components/Webs';
import { graphql } from 'react-relay';
import { View } from 'react-native';

const ManageYourWebsMessage = () => (
  <FormattedMessage
    defaultMessage="Manage your webs"
    id="index.manageYourWebs"
  />
);

const Authenticated = ({ data }) => (
  <View style={{ flex: 1 }}>
    <Heading size={1}>{<ManageYourWebsMessage />}</Heading>
    <Webs data={data} />
    <CreateWeb />
  </View>
);

const NotAuthenticated = () => (
  <View>
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
  </View>
);

const Index = props => {
  return (
    <Page title={intl => intl.formatMessage(titles.index)} data={props.data}>
      {isAuthenticated => (
        <React.Fragment>
          <Heading size={3}>Este</Heading>
          {isAuthenticated ? (
            <Authenticated data={props.data} />
          ) : (
            <NotAuthenticated />
          )}
        </React.Fragment>
      )}
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
