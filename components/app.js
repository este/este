// @flow
import 'rxjs'; // This imports the entire core set of functionality.
import IsAuthenticatedProvider from './IsAuthenticatedProvider';
import React, { type ComponentType } from 'react';
import RelayProvider from './RelayProvider';
import Router from 'next/router';
import createReduxStore from '../lib/createReduxStore';
import createRelayEnvironment from '../lib/createRelayEnvironment';
import felaRenderer from '../lib/felaRenderer';
import sitemap from '../lib/sitemap';
import type { IntlShape } from 'react-intl';
import type { Store, State, PayloadError } from '../types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';
import { createProvider as createReduxProvider } from 'react-redux';
import { fetchQuery } from 'react-relay';
import { parse as parseCookie } from 'cookie';
// import { reportRelayError } from '../lib/raven';

// http://blog.ploeh.dk/2011/07/28/CompositionRoot

// Polyfill browser stuff.
if (process.browser) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Register React Intl's locale data for the user's locale in the browser.
  // This locale data was added to the page by `pages/_document.js`. This only
  // happens once, on initial page load in the browser.
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

export const redirectUrlKey = 'redirectUrl';

const redirectToSignIn = ({ pathname, res }) => {
  const path = `${sitemap.signIn.path}?${redirectUrlKey}=${encodeURIComponent(
    pathname,
  )}`;
  if (res) {
    res.writeHead(303, { Location: path });
    res.end();
  } else {
    Router.replace(path);
  }
};

// const onRelayError = error => {
//   if (isInnocentError(error)) return;
//   reportRelayError(error);
// };

export type Req = {
  ...http$IncomingMessage,
  locale: string,
  localeDataScript: string,
  messages: Object,
  supportedLocales: Array<string>,
};

// https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
type NextContext = {
  pathname: string,
  query: Object,
  asPath: string,
  req: ?Req,
  res: ?http$ServerResponse,
  jsonPageRes: Object,
  err: Object,
};

type NextProps = {
  url: {
    pathname: string,
    query: Object,
  },
};

type InitialAppProps = {|
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  serverState: State,
  token: ?string,
|};

type AppProps = NextProps & InitialAppProps;

type PageProps = {
  data: Object,
  intl: IntlShape,
} & NextProps;

const app = (
  Page: ComponentType<PageProps>,
  options?: {|
    fetch?: Object,
    prepareQuery?: Object => Object,
    requireAuth?: boolean,
  |},
) => {
  const { fetch, prepareQuery = object => object, requireAuth } = options || {};
  const PageWithHigherOrderComponents = injectIntl(Page);

  const App = ({
    data,
    initialNow,
    locale,
    messages,
    records,
    serverState,
    token,
    url,
  }: AppProps) => {
    const variables = prepareQuery(url.query);
    const environment = createRelayEnvironment({
      records,
      onRelayError: () => {},
      token,
    });
    const reduxStore = getReduxStore(serverState);
    // createReduxProvider, because exported Provider has an obsolete check.
    // https://github.com/reactjs/react-redux/blob/fd81f1812c2420aa72805b61f1d06754cb5bfb43/src/components/Provider.js#L13
    // $FlowFixMe https://github.com/flowtype/flow-typed/issues/1154#issuecomment-324156744
    const ReduxProvider = createReduxProvider();

    return (
      <RelayProvider environment={environment} variables={variables}>
        <ReduxProvider store={reduxStore}>
          <FelaProvider renderer={felaRenderer}>
            <IntlProvider
              locale={locale}
              messages={messages}
              initialNow={initialNow}
            >
              <IsAuthenticatedProvider isAuthenticated={!!token}>
                <PageWithHigherOrderComponents data={data} url={url} />
              </IsAuthenticatedProvider>
            </IntlProvider>
          </FelaProvider>
        </ReduxProvider>
      </RelayProvider>
    );
  };

  App.getInitialProps = async (context: NextContext) => {
    const cookie = context.req
      ? (context.req.headers && context.req.headers.cookie) || ''
      : // eslint-disable-next-line no-undef
        document.cookie;
    const token = cookie ? parseCookie(cookie).token : null;

    if (requireAuth && !token) {
      redirectToSignIn(context);
      // Return nothing because component will not be rendered on redirect.
      return {};
    }

    let payloadError: ?PayloadError = null;
    let data = {};
    let records = {};

    // Note we call fetchQuery for client page transitions as well to enable
    // pending navigations. Finally possible with Next.js and Relay.
    // https://writing.pupius.co.uk/beyond-pushstate-building-single-page-applications-4353246f4480
    if (fetch) {
      const environment = createRelayEnvironment({
        onRelayError: error => {
          // Because fetchQuery does not return graph.cool error.
          payloadError = error;
          // onRelayError(error);
        },
        token,
      });
      const variables = prepareQuery(context.query);
      data = await fetchQuery(environment, fetch, variables);
      records = environment
        .getStore()
        .getSource()
        .toJSON();
    }

    if (payloadError != null) {
      // If a user has insufficient permissions only, do nothing. It can happen
      // and probably that's why Relay generated Flow types are optional.
      // Better to render something than nothing I guess.
      // if (!isInnocentError(payloadError)) {
      //   // Probably serious error here so there is not much else we can do.
      //   const message = payloadError.map(error => error.message).join(', ');
      //   throw new Error(message);
      // }
    }

    // Always update the current time on page load/transition because the
    // <IntlProvider> will be a new instance even with pushState routing.
    const initialNow = Date.now();

    const { locale, messages, supportedLocales } =
      context.req || window.__NEXT_DATA__.props;

    return ({
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
      token,
    }: InitialAppProps);
  };

  return App;
};

export default app;
