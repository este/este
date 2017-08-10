// @flow
import type { IntlShape } from 'react-intl';
import type { Store, ServerState, FunctionalComponent, Viewer } from '../types';
import type { appQueryResponse } from './__generated__/appQuery.graphql';
import React from 'react';
import RelayProvider from './RelayProvider';
import Router from 'next/router';
import cookie from 'cookie';
import createReduxStore from '../lib/createReduxStore';
import createRelayEnvironment from '../lib/createRelayEnvironment';
import felaRenderer from '../lib/felaRenderer';
import localForage from 'localforage';
import persistStore from '../lib/persistStore';
import sitemap from '../lib/sitemap';
import uuid from 'uuid';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';
import { Provider as ReduxProvider } from 'react-redux';
import { fetchQuery, graphql } from 'react-relay';
import { reportRelayFetchError } from '../lib/raven';

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

type InitialProps = {
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  serverState: ServerState,
  viewer: Viewer,
};

type AppProps = NextProps & InitialProps;

type PageProps = NextProps & {
  data: Object,
  intl: IntlShape,
  viewer: Viewer,
};

// Cache client Redux store to preserve app state across page transitions.
let clientReduxStore: ?Store = null;

const getReduxStore = (serverState, getEnvironment) => {
  const platformDependencies = { createUuid: uuid.v4, getEnvironment };
  // Always return fresh new Redux store for the server.
  if (!process.browser) {
    return createReduxStore(serverState, { platformDependencies });
  }
  const state = clientReduxStore ? clientReduxStore.getState() : serverState;
  clientReduxStore = createReduxStore(state, { platformDependencies });
  return clientReduxStore;
};

const tryGetClientOrServerTokenFromCookie = req => {
  const clientOrServerCookie = req
    ? req.headers && req.headers.cookie
    : // eslint-disable-next-line no-undef
      typeof document !== 'undefined' && document.cookie;
  if (!clientOrServerCookie) return null;
  return cookie.parse(clientOrServerCookie).token;
};

const appQuery = graphql`
  query appQuery {
    viewer {
      user {
        id
      }
    }
  }
`;

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

const app = (
  Page: FunctionalComponent<PageProps>,
  options?: {|
    fetch?: Object,
    prepareQuery?: Object => Object,
    requireAuth?: boolean,
  |},
) => {
  const { fetch, prepareQuery = object => object, requireAuth } = options || {};
  const PageWithDefaultHOCs = injectIntl(Page);

  return class App extends React.Component {
    static async getInitialProps(context) {
      let pageInitialProps = {};
      if (Page.getInitialProps) {
        pageInitialProps = await Page.getInitialProps(context);
      }

      const environment = createRelayEnvironment({
        reportRelayFetchError,
        token: tryGetClientOrServerTokenFromCookie(context.req),
      });

      // Always try to fetch viewer to render correct auth state in page header.
      // This additional request can be cached ofc.
      const { viewer: { user: viewer } }: appQueryResponse = await fetchQuery(
        environment,
        appQuery,
      );

      if (requireAuth && !viewer) {
        return redirectToSignIn(context);
      }

      // Note we call fetchQuery for client page transitions as well to enable
      // pending navigations. Finally possible with Next.js and Relay.
      // https://writing.pupius.co.uk/beyond-pushstate-building-single-page-applications-4353246f4480
      let data = {};
      let records = {};
      if (fetch) {
        const variables = prepareQuery(context.query);
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        data = await fetchQuery(environment, fetch, variables);
        records = environment.getStore().getSource().toJSON();
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
        viewer,
      }: InitialProps);
    }

    props: AppProps;
    environment: Object;
    reduxStore: Store;

    constructor(props: AppProps) {
      super(props);
      this.createRelayEnvironment(props.records);
      this.reduxStore = getReduxStore(
        props.serverState,
        () => this.environment,
      );
    }

    createRelayEnvironment(records: Object) {
      this.environment = createRelayEnvironment({
        records,
        reportRelayFetchError,
        token: tryGetClientOrServerTokenFromCookie(),
      });
    }

    componentDidMount() {
      // componentDidMount, because we have to restore persisted client state
      // after the initial render to prevent client/server HTML mismatch.
      persistStore(this.reduxStore, localForage);
    }

    componentWillReceiveProps({ records }: AppProps) {
      if (records !== this.props.records) {
        this.createRelayEnvironment(records);
      }
    }

    render() {
      const { initialNow, locale, messages, records, ...props } = this.props;
      const variables = prepareQuery(this.props.url.query);

      return (
        <RelayProvider environment={this.environment} variables={variables}>
          <ReduxProvider store={this.reduxStore}>
            <FelaProvider renderer={felaRenderer}>
              <IntlProvider
                locale={locale}
                messages={messages}
                initialNow={initialNow}
              >
                <PageWithDefaultHOCs {...props} />
              </IntlProvider>
            </FelaProvider>
          </ReduxProvider>
        </RelayProvider>
      );
    }
  };
};

export default app;
