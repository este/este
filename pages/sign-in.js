// @flow
import * as React from 'react';
import Auth from '../components/core/Auth';
import AppPage from '../components/app/AppPage';
import { graphql } from 'react-relay';
import { titles } from '../browser/sitemap';
import type { PageWithQuery } from './_app';
import type { signInQuery } from './__generated__/signInQuery.graphql';

const SignIn: PageWithQuery<signInQuery> = props => (
  <AppPage
    title={intl => intl.formatMessage(titles.signIn)}
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    data={props.data}
  >
    <Auth redirectUrl={{ pathname: '/' }} />
  </AppPage>
);

SignIn.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query signInQuery {
        ...AppPage
      }
    `,
  );
  return { data };
};

export default SignIn;
