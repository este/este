// @flow
import * as React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl, isAuthenticated }) => (
  <Page
    title={intl.formatMessage(sitemap.signIn.title)}
    isAuthenticated={isAuthenticated}
  >
    <Auth />
  </Page>
);

export default app(SignIn);
