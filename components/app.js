// @flow
import * as React from 'react';
import RelayProvider from './RelayProvider';
import Router from 'next/router';
import createReduxStore from '../lib/createReduxStore';
import createRelayEnvironment from '../lib/createRelayEnvironment';
import type { Href } from '../lib/sitemap';
import type { IntlShape } from 'react-intl';
import type { Store, State } from '../types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { createProvider as createReduxProvider } from 'react-redux';
import { fetchQuery } from 'react-relay';
import { getCookie, type Cookie } from '../lib/cookie';

// import { installRelayDevTools } from 'relay-devtools';
// installRelayDevTools();

// http://blog.ploeh.dk/2011/07/28/CompositionRoot

// Polyfill browser stuff.
if (process.browser) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Add locale data injected in pages/_document.js
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

let clientReduxStore: ?Store = null;

const getReduxStore = serverState => {
  if (!process.browser) {
    return createReduxStore(serverState);
  }
  // Preserve Redux state across page transitions.
  const state = clientReduxStore ? clientReduxStore.getState() : serverState;
  clientReduxStore = createReduxStore(state);
  return clientReduxStore;
};

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

type InitialAppProps = {|
  cookie: ?Cookie,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  serverState: State,
|};

type AppProps = NextProps & InitialAppProps;

type Page = React.ComponentType<
  {
    data: Object,
    intl: IntlShape,
    isAuthenticated: boolean,
    userId: ?string,
  } & NextProps,
>;

export type QueryVariables<Query> = {|
  isAuthenticated: boolean,
  query: Query,
  userId: ?string,
|};

const app = (
  Page: Page,
  options?: {|
    query?: Object,
    queryVariables?: (variables: QueryVariables<Object>) => Object,
    requireAuth?: boolean,
  |},
) => {
  const { query, queryVariables, requireAuth } = options || {};
  const PageWithHigherOrderComponents = injectIntl(Page);

  const App = ({
    cookie,
    data,
    initialNow,
    locale,
    messages,
    records,
    serverState,
    url,
  }: AppProps) => {
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
    // createReduxProvider, because exported Provider has an obsolete check.
    // https://github.com/reactjs/react-redux/blob/fd81f1812c2420aa72805b61f1d06754cb5bfb43/src/components/Provider.js#L13
    // $FlowFixMe https://github.com/flowtype/flow-typed/issues/1154#issuecomment-324156744
    const ReduxProvider = createReduxProvider();
    const reduxStore = getReduxStore(serverState);

    return (
      <RelayProvider environment={environment} variables={variables}>
        <ReduxProvider store={reduxStore}>
          <IntlProvider
            locale={locale}
            messages={messages}
            initialNow={initialNow}
          >
            <PageWithHigherOrderComponents
              data={data}
              isAuthenticated={isAuthenticated}
              url={url}
              userId={userId}
            />
          </IntlProvider>
        </ReduxProvider>
      </RelayProvider>
    );
  };

  App.getInitialProps = async (context: NextContext) => {
    const cookie = getCookie(context.req);
    const isAuthenticated = !!cookie;

    if (requireAuth && !isAuthenticated) {
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
      serverState: {
        app: {
          baselineShown: false,
          darkEnabled: true,
          defaultLocale: DEFAULT_LOCALE,
          error: null,
          locale,
          name: APP_NAME,
          supportedLocales,
          version: APP_VERSION,
        },
      },
    }: InitialAppProps);
  };

  return App;
};

export default app;
