// @flow
/* global window */

// https://github.com/facebook/relay/issues/2347
// const { installRelayDevTools } = require('relay-devtools');
// installRelayDevTools();

import * as React from 'react';
import Router from 'next/router';
import createRelayEnvironment from './createRelayEnvironment';
import type { Href } from '../../server/sitemap';
import type { IntlShape } from 'react-intl';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { fetchQuery } from 'react-relay';
import type { GraphQLTaggedNode } from 'react-relay';
import { getCookie, type Cookie } from './cookie';
import { LocaleProvider } from '../Locale';
import { MutationProvider } from '../Mutation';
import { IsAuthenticatedProvider } from '../IsAuthenticated';
import { ErrorPopupProvider } from '../ErrorPopup';
import RelayProvider from '../RelayProvider';

// Polyfill browser stuff.
if (process.browser === true) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Add locale data injected in pages/_document.js
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

type UrlQuery = Object;

type NextProps = {|
  url: {
    pathname: string,
    query: UrlQuery,
  },
|};

type InitialAppProps = {|
  cookie: ?Cookie,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  supportedLocales: Array<string>,
|};

const redirectToSignIn = context => {
  const { asPath, res } = context;
  const redirectUrlKey = 'redirectUrl';
  const redirectUrl = encodeURIComponent(asPath);
  const href: Href = {
    pathname: '/sign-in',
    query: { [redirectUrlKey]: redirectUrl },
  };
  if (res) {
    res.writeHead(303, {
      Location: `${href.pathname}?${redirectUrlKey}=${redirectUrl}`,
    });
    res.end();
  } else {
    Router.replace(href);
  }
};

type PageProps = {
  ...NextProps,
  data: Object,
  intl: IntlShape,
};

type AppProps = {
  ...NextProps,
  ...InitialAppProps,
};

// TODO: Add generic type so data is Response and queryVariables returns
// Variables and everything is type checked out of the box.
const app = (
  // Stateless, because state belongs elsewhere.
  Page: React.StatelessFunctionalComponent<PageProps>,
  options?: {|
    query?: GraphQLTaggedNode,
    queryVariables?: ({|
      isAuthenticated: boolean,
      urlQuery: UrlQuery,
      userId: ?string,
    |}) => Object,
    requireAuth?: boolean,
  |},
) => {
  const { query, queryVariables, requireAuth } = options || {};
  const PageWithHigherOrderComponents = injectIntl(Page);
  const createQueryVariables = (isAuthenticated, urlQuery, userId) => {
    if (!queryVariables) return {};
    return queryVariables({ isAuthenticated, urlQuery, userId });
  };

  const App = (props: AppProps) => {
    const {
      cookie,
      data,
      initialNow,
      locale,
      messages,
      records,
      supportedLocales,
      url,
    } = props;

    const token = cookie && cookie.token;
    const environment = createRelayEnvironment(token, records);
    const isAuthenticated = !!cookie;
    const userId = cookie && cookie.userId;
    const variables = createQueryVariables(isAuthenticated, url.query, userId);

    return (
      <IntlProvider
        locale={locale}
        messages={messages}
        initialNow={initialNow}
        // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
        textComponent={({ children }) => children}
      >
        <LocaleProvider value={{ locale, supportedLocales }}>
          <MutationProvider value={{ environment }}>
            <IsAuthenticatedProvider value={{ isAuthenticated, userId }}>
              <ErrorPopupProvider>
                <RelayProvider environment={environment} variables={variables}>
                  <PageWithHigherOrderComponents data={data} url={url} />
                </RelayProvider>
              </ErrorPopupProvider>
            </IsAuthenticatedProvider>
          </MutationProvider>
        </LocaleProvider>
      </IntlProvider>
    );
  };

  // Universal data fetching with pending navigation FTW.
  // For many years, JavaScript apps sucked socks.
  // Async data with spinners were everywhere. Terrible UX and DX.
  // Relay and Next.js solved it.
  // Relay, because we can declaratively describe data.
  // Next.js, becase of its router with getInitialProps.
  // Panacea. Finally.
  // https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
  App.getInitialProps = async (context: {
    pathname: string,
    query: UrlQuery,
    asPath: string,
    req: ?{
      ...http$IncomingMessage,
      locale: string,
      localeDataScript: string,
      messages: Object,
      supportedLocales: Array<string>,
    },
    res: ?http$ServerResponse,
    jsonPageRes: Object,
    err: Object,
  }) => {
    const cookie = getCookie(context.req);
    const isAuthenticated = !!cookie;

    if (requireAuth === true && !isAuthenticated) {
      redirectToSignIn(context);
      // Return nothing because component will not be rendered on redirect.
      return {};
    }

    let data = {};
    let records = {};

    // Note we call fetchQuery for client page transitions as well to enable
    // pending navigations. Finally possible with Next.js and Relay.
    // https://writing.pupius.co.uk/beyond-pushstate-building-single-page-applications-4353246f4480
    if (query) {
      const environment = createRelayEnvironment(cookie && cookie.token);
      const userId = cookie && cookie.userId;
      const variables = createQueryVariables(
        isAuthenticated,
        context.query,
        userId,
      );
      // It can throw "Failed to fetch" error when offline, but it should be
      // solved with service workers I believe.
      // It does not throw on payload errors like insufficient permissions etc.,
      // because payload errors are not real errors. They are expected when the
      // schema is updated and an app is not yet updated. That's why Relay
      // compiler generates maybe types. Don't crash, just don't show data.
      // Another mechanism should invoke app update.
      data = await fetchQuery(environment, query, variables);
      records = environment
        .getStore()
        .getSource()
        .toJSON();
    }

    // Always update the current time on page load/transition because the
    // <IntlProvider> will be a new instance even with pushState routing.
    const initialNow = Date.now();

    const { locale, messages, supportedLocales } =
      context.req || window.__NEXT_DATA__.props;

    return ({
      cookie,
      data,
      initialNow,
      locale,
      messages,
      records,
      supportedLocales,
    }: InitialAppProps);
  };

  return App;
};

export default app;
