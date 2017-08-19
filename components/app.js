// @flow
import type { IntlShape } from 'react-intl';
import type { Store, ServerState, GraphCoolError } from '../types';
import IsAuthenticatedProvider from './IsAuthenticatedProvider';
import React, { type ComponentType } from 'react';
import RelayProvider from './RelayProvider';
import Router from 'next/router';
import createReduxStore from '../lib/createReduxStore';
import createRelayEnvironment from '../lib/createRelayEnvironment';
import felaRenderer from '../lib/felaRenderer';
import localForage from 'localforage';
import persistStore from '../lib/persistStore';
import sitemap from '../lib/sitemap';
import uuid from 'uuid';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';
// $FlowFixMe https://github.com/flowtype/flow-typed/issues/1154
import { createProvider as createReduxProvider } from 'react-redux';
import { fetchQuery } from 'react-relay';
import { parse as parseCookie } from 'cookie';
import { reportRelayError } from '../lib/raven';

// http://blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform via app.ios.js and app.android.js probably.

// polyfill browser stuff
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

// TODO: Waiting for Next.js 3 type definitions.
type NextProps = {
  url: {
    pathname: string,
    query: Object,
  },
};

type InitialAppProps = {
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  serverState: ServerState,
  token: ?string,
};

type AppProps = NextProps & InitialAppProps;

type PageProps = NextProps & {
  data: Object,
  intl: IntlShape,
  token: ?string,
};

let clientReduxStore: ?Store = null;

const getReduxStore = (serverState, getEnvironment) => {
  const platformDependencies = { createUuid: uuid.v4, getEnvironment };
  if (!process.browser) {
    return createReduxStore(serverState, { platformDependencies });
  }
  // Preserve Redux state across page transitions.
  const state = clientReduxStore ? clientReduxStore.getState() : serverState;
  clientReduxStore = createReduxStore(state, { platformDependencies });
  persistStore(clientReduxStore, localForage);
  return clientReduxStore;
};

export const redirectUrlKey = 'redirectUrl';

const redirectToSignIn = context => {
  const pathname = encodeURIComponent(context.pathname);
  const path = `${sitemap.signIn.path}?${redirectUrlKey}=${pathname}`;
  if (process.browser) {
    Router.replace(path);
  } else {
    context.res.writeHead(303, { Location: path });
    context.res.end();
  }
  // No need to do anything else in case of redirect.
  // Component will not be rendered.
  return {};
};

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
export const isInsufficientPermissionsError = (error: GraphCoolError) =>
  error.every(error => error.code === 3008);

const onRelayError = error => {
  // It can happen, no reason to report it as app error.
  if (isInsufficientPermissionsError(error)) return;
  reportRelayError(error);
};

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
    initialNow,
    locale,
    messages,
    records,
    serverState,
    token,
    ...props
  }: AppProps) => {
    const variables = prepareQuery(props.url.query);
    const environment = createRelayEnvironment({
      records,
      onRelayError,
      token,
    });
    const reduxStore = getReduxStore(serverState, () => environment);
    // Workaround for obsolete warning. We don't want to cache reduxStore.
    // https://github.com/reactjs/react-redux/blob/master/src/components/Provider.js#L13
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
                <PageWithHigherOrderComponents {...props} />
              </IsAuthenticatedProvider>
            </IntlProvider>
          </FelaProvider>
        </ReduxProvider>
      </RelayProvider>
    );
  };

  App.getInitialProps = async context => {
    let pageInitialProps = {};
    if (typeof Page.getInitialProps === 'function') {
      pageInitialProps = await Page.getInitialProps(context);
    }

    const cookie = process.browser
      ? // eslint-disable-next-line no-undef
        typeof document !== 'undefined' && document.cookie
      : context.req.headers && context.req.headers.cookie;
    const token = cookie ? parseCookie(cookie).token : null;

    if (requireAuth && !token) {
      return redirectToSignIn(context);
    }

    let graphCoolError: ?GraphCoolError = null;
    let data = {};
    let records = {};

    // Note we call fetchQuery for client page transitions as well to enable
    // pending navigations. Finally possible with Next.js and Relay.
    // https://writing.pupius.co.uk/beyond-pushstate-building-single-page-applications-4353246f4480
    if (fetch) {
      const environment = createRelayEnvironment({
        onRelayError: error => {
          // Because fetchQuery does not return graph.cool error.
          graphCoolError = error;
          onRelayError(error);
        },
        token,
      });
      const variables = prepareQuery(context.query);
      data = await fetchQuery(environment, fetch, variables);
      records = environment.getStore().getSource().toJSON();
    }

    if (graphCoolError != null) {
      // If a user has insufficient permissions only, do nothing. It can happen
      // and probably that's why Relay generated Flow types are optional.
      // Better to render something than nothing I guess.
      if (!isInsufficientPermissionsError(graphCoolError)) {
        // Probably serious error here so there is not much else we can do.
        const message = graphCoolError.map(error => error.message).join(', ');
        throw new Error(message);
      }
    }

    // Always update the current time on page load/transition because the
    // <IntlProvider> will be a new instance even with pushState routing.
    const initialNow = Date.now();

    const { locale, messages, supportedLocales } =
      context.req || window.__NEXT_DATA__.props;

    return ({
      ...pageInitialProps,
      data,
      initialNow,
      locale,
      messages,
      records,
      serverState: {
        app: {
          baselineShown: false,
          darkEnabled: false,
          errors: null,
          name: APP_NAME,
          version: APP_VERSION,
          locale,
          defaultLocale: DEFAULT_LOCALE,
          supportedLocales,
        },
      },
      token,
    }: InitialAppProps);
  };

  return App;
};

export default app;
