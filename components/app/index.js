// @flow
/* global window */
import * as React from 'react';
import RelayProvider from '../RelayProvider';
import Router from 'next/router';
import createRelayEnvironment from './createRelayEnvironment';
import type { Href } from '../../server/sitemap';
import type { IntlShape } from 'react-intl';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { fetchQuery } from 'react-relay';
import { getCookie, type Cookie } from './cookie';
import { LocaleProvider } from '../Locale';
import { IsAuthenticatedProvider } from '../IsAuthenticated';
import { ErrorPopupProvider } from '../ErrorPopup';

// import { installRelayDevTools } from 'relay-devtools';
// installRelayDevTools();

// Polyfill browser stuff.
if (process.browser === true) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Add locale data injected in pages/_document.js
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

// https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
type NextContext = {
  pathname: string,
  query: Object,
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
};

type NextProps = {
  url: {
    pathname: string,
    query: { [key: string]: ?string },
  },
};

// Stateless, because:
// 1) Page should not have a state. Page state comes from URL or Relay.
// 2) StatelessFunctionalComponent works well with HOC and Flow. Component not.
// 3) We don't have to type props, they are inferred.
type StatelessPage = React.StatelessFunctionalComponent<
  {
    data: Object,
    intl: IntlShape,
  } & NextProps,
>;

type InitialAppProps = {|
  cookie: ?Cookie,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  supportedLocales: Array<string>,
|};

type AppProps = NextProps & InitialAppProps;

export type QueryVariables<Query> = {|
  isAuthenticated: boolean,
  query: Query,
  userId: ?string,
|};

const redirectToSignIn = (context: NextContext) => {
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

// https://reactjs.org/docs/higher-order-components.html
const app = (
  Page: StatelessPage,
  options?: {|
    query?: Object,
    queryVariables?: (variables: QueryVariables<Object>) => Object,
    requireAuth?: boolean,
  |},
) => {
  const { query, queryVariables, requireAuth } = options || {};
  const PageWithHigherOrderComponents = injectIntl(Page);

  // Stateless, because App state belongs to providers.
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
    const userId = cookie && cookie.userId;
    const isAuthenticated = !!cookie;
    const variables = queryVariables
      ? queryVariables({
          isAuthenticated,
          query: url.query,
          userId,
        })
      : {};

    return (
      <IntlProvider
        locale={locale}
        messages={messages}
        initialNow={initialNow}
        // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
        textComponent={({ children }) => children}
      >
        <LocaleProvider value={{ locale, supportedLocales }}>
          <RelayProvider environment={environment} variables={variables}>
            <IsAuthenticatedProvider value={{ isAuthenticated, userId }}>
              <ErrorPopupProvider>
                <PageWithHigherOrderComponents data={data} url={url} />
              </ErrorPopupProvider>
            </IsAuthenticatedProvider>
          </RelayProvider>
        </LocaleProvider>
      </IntlProvider>
    );
  };

  // SSR data fetching with pending navigation FTW.
  App.getInitialProps = async (context: NextContext) => {
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
      const variables = queryVariables
        ? queryVariables({
            isAuthenticated,
            query: context.query,
            userId: cookie && cookie.userId,
          })
        : {};
      // It can throw "Failed to fetch" error when offline, but it should be
      // solved with service workers I believe.
      // It does not throw on payload errors like insufficient permissions etc.,
      // because payload errors are not real errors. They are expected when the
      // schema is updated and an app is not yet updated. That's why Relay
      // generated Flow types are optional. Don't crash, just don't show data.
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
