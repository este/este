// @flow
import * as React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl, isAuthenticated, url }) => (
  <Page
    title={intl.formatMessage(sitemap.titles.signIn)}
    isAuthenticated={isAuthenticated}
  >
    <Auth intl={intl} redirectUrl={url.query.redirectUrl} />
  </Page>
);

export default app(SignIn);
