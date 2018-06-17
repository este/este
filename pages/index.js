// @flow
import * as React from 'react';
import { titles } from '../components/app/sitemap';
import AppPage from '../components/AppPage';
import Heading from '../components/core/Heading';
import app from '../components/app';
import A from '../components/core/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/core/Blockquote';
import Block from '../components/core/Block';
import CreateWeb from '../components/CreateWeb';
import Webs from '../components/Webs';
import { graphql } from 'react-relay';

const Authenticated = ({ data }) => (
  <>
    <Heading size={1}>
      <FormattedMessage defaultMessage="Your webs" id="yourWebs.heading" />
    </Heading>
    <Webs data={data} />
    <CreateWeb />
  </>
);

const NotAuthenticated = () => (
  <>
    <Heading size={2}>Este</Heading>
    <Block>
      <A href={{ pathname: '/sign-in', query: { redirectUrl: '/' } }}>
        <FormattedMessage defaultMessage="Create web" id="yourWebs.createWeb" />
      </A>
    </Block>
    <Blockquote
      source="Friedrich Hayek"
      href="https://en.wikipedia.org/wiki/Friedrich_Hayek"
    >
      The curious task of economics is to demonstrate to men how little they
      really know about what they imagine they can design.
    </Blockquote>
  </>
);

const Index = props => {
  return (
    <AppPage title={intl => intl.formatMessage(titles.index)} data={props.data}>
      {isAuthenticated =>
        isAuthenticated ? (
          <Authenticated data={props.data} />
        ) : (
          <NotAuthenticated />
        )
      }
    </AppPage>
  );
};

export default app(Index, {
  query: graphql`
    query pagesQuery {
      ...AppPage
      ...Webs
    }
  `,
});
