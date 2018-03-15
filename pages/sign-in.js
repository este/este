// @flow
import * as React from 'react';
import Auth from '../components/core/Auth';
import Page from '../components/core/Page';
import app from '../components/app';
import { graphql } from 'react-relay';
import { titles } from '../components/app/sitemap';

const SignIn = props => (
  <Page title={intl => intl.formatMessage(titles.signIn)} data={props.data}>
    <Auth redirectUrl={{ pathname: '/' }} />
  </Page>
);

export default app(SignIn, {
  query: graphql`
    query signInQuery {
      ...Page
    }
  `,
});
