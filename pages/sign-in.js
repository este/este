// @flow
import React from 'react';
import AuthForm from '../components/AuthForm';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl }) => (
  <Page title={intl.formatMessage(sitemap.signIn.title)}>
    <AuthForm />
  </Page>
);

export default app(SignIn);
