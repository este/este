// @flow
import * as React from 'react';
import { titles } from '../browser/sitemap';
import AppPage from '../components/app/AppPage';
import Heading from '../components/core/Heading';
import A from '../components/core/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/core/Blockquote';
import Block from '../components/core/Block';
import Row from '../components/core/Row';
import CreateWeb from '../components/CreateWeb';
import Webs from '../components/Webs';
import { graphql } from 'react-relay';
import type { PageWithQuery } from './_app';
import type { pagesQuery } from './__generated__/pagesQuery.graphql';

const Authenticated = ({ data }) => (
  <>
    <Heading size={1}>
      <FormattedMessage defaultMessage="Your webs" id="yourWebs.heading" />
    </Heading>
    {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
    <Webs data={data} />
    <CreateWeb />
  </>
);

const NotAuthenticated = () => (
  <>
    <Heading size={2}>Este</Heading>
    <Block>
      <Row>
        <A href={{ pathname: '/sign-in', query: { redirectUrl: '/' } }}>
          <FormattedMessage
            defaultMessage="Create web"
            id="yourWebs.createWeb"
          />
        </A>
      </Row>
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

const Index: PageWithQuery<pagesQuery> = props => {
  return (
    <AppPage
      title={intl => intl.formatMessage(titles.index)}
      // $FlowFixMe https://github.com/facebook/relay/issues/2316
      data={props.data}
    >
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

Index.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query pagesQuery {
        ...AppPage
        ...Webs
      }
    `,
  );
  return { data };
};

export default Index;
