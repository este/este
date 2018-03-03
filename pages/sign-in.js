// @flow
import * as React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import { titles } from '../server/sitemap';
import { graphql } from 'react-relay';

const SignIn = props => (
  <Page title={intl => intl.formatMessage(titles.signIn)} data={props.data}>
    <Auth />
  </Page>
);

export default app(SignIn, {
  query: graphql`
    query signInQuery {
      ...Page
    }
  `,
});
