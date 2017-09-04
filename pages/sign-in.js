// @flow
import React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl }) => (
  <Page title={intl.formatMessage(sitemap.signIn.title)}>
    <Auth />
  </Page>
);

export default app(SignIn);
