// @flow
import React from 'react';
import sitemap from '../lib/sitemap';
import Page from '../components/Page';
import Heading from '../components/Heading';
import app from '../components/app';
import withIsAuthenticated, {
  type IsAuthenticatedContext,
} from '../components/withIsAuthenticated';
import A from '../components/A';
import { FormattedMessage } from 'react-intl';
import Blockquote from '../components/Blockquote';
import P from '../components/P';

const Index = ({ intl }, { isAuthenticated }: IsAuthenticatedContext) =>
  <Page title={intl.formatMessage(sitemap.index.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.index.title)}
    </Heading>
    <P>
      <A href={sitemap.me.path}>
        {isAuthenticated
          ? <FormattedMessage
              defaultMessage="Manage your webs"
              id="index.manageYourWebs"
            />
          : <FormattedMessage
              defaultMessage="Create your first web"
              id="index.createYourFirstWeb"
            />}
      </A>
    </P>
    <Blockquote
      source="Friedrich Hayek"
      href="https://en.wikipedia.org/wiki/Friedrich_Hayek"
    >
      The curious task of economics is to demonstrate to men how little they
      really know about what they imagine they can design.
    </Blockquote>
  </Page>;

withIsAuthenticated(Index);

export default app(Index);
