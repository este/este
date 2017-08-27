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

const Index = ({ intl }, { isAuthenticated }: IsAuthenticatedContext) =>
  <Page title={intl.formatMessage(sitemap.index.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.index.title)}
    </Heading>
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
  </Page>;

withIsAuthenticated(Index);

export default app(Index);
