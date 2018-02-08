// @flow
import * as React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import { titles } from '../server/sitemap';

const SignIn = ({ intl, url }) => (
  <Page title={intl.formatMessage(titles.signIn)}>
    <Auth intl={intl} redirectUrl={url.query.redirectUrl} />
  </Page>
);

export default app(SignIn);
