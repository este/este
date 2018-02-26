// @flow
import * as React from 'react';
import Auth from '../components/Auth';
import Page from '../components/Page';
import app from '../components/app';
import { titles } from '../server/sitemap';
import { graphql } from 'react-relay';

const SignIn = props => (
  <Page title={props.intl.formatMessage(titles.signIn)} data={props.data}>
    <Auth intl={props.intl} redirectUrl={props.url.query.redirectUrl} />
  </Page>
);

export default app(SignIn, {
  query: graphql`
    query signInQuery {
      ...Page
    }
  `,
});
