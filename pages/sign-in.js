// @flow
import * as React from 'react';
import Auth from '../components/core/Auth';
import AppPage from '../components/app/AppPage';
import app from '../components/app/app';
import { graphql } from 'react-relay';
import { titles } from '../components/app/sitemap';

const SignIn = props => (
  <AppPage title={intl => intl.formatMessage(titles.signIn)} data={props.data}>
    <Auth redirectUrl={{ pathname: '/' }} />
  </AppPage>
);

export default app(SignIn, {
  query: graphql`
    query signInQuery {
      ...AppPage
    }
  `,
});
