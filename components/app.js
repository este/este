// @flow
import type { IntlShape } from 'react-intl';
import type { Store, ServerState, FunctionalComponent } from '../types';
import React from 'react';
import RelayProvider from './RelayProvider';
import createReduxStore from '../lib/createReduxStore';
import createRelayEnvironment from '../lib/createRelayEnvironment';
import felaRenderer from '../lib/felaRenderer';
import localForage from 'localforage';
import persistStore from '../lib/persistStore';
import uuid from 'uuid';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';
import { Provider as ReduxProvider } from 'react-redux';
import { fetchQuery } from 'react-relay';

// http://blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform via app.ios.js and app.android.js probably.

if (process.browser) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Register React Intl's locale data for the user's locale in the browser.
  // This locale data was added to the page by `pages/_document.js`. This only
  // happens once, on initial page load in the browser.
  if (window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach(lang => {
      addLocaleData(window.ReactIntlLocaleData[lang]);
    });
  }
}

type AppProps = {
  initialNow: number,
  locale: string,
  messages: Object,
  queryProps: Object,
  queryRecords: Object,
  serverState: ServerState,
};

type PageProps = {
  intl: IntlShape,
  queryProps: Object,
  serverState: ServerState,
  // TODO: Waiting for Next.js 3 type definitions.
  url: {
    pathname: string,
  },
};

// Cache client Redux store to preserve app state across page transitions.
let clientReduxStore = null;

const getReduxStore = (serverState, environment) => {
  const platformDependencies = { createUuid: uuid.v4, environment };
  // Always return fresh new Redux store for the server.
  if (!process.browser) {
    return createReduxStore(serverState, { platformDependencies });
  }
  const state = clientReduxStore ? clientReduxStore.getState() : serverState;
  clientReduxStore = createReduxStore(state, { platformDependencies });
  return clientReduxStore;
};

const app = (
  Page: FunctionalComponent<PageProps>,
  options: {
    query?: Object,
  } = {},
) => {
  const PageWithDefaultHOCs = injectIntl(Page);

  return class App extends React.Component {
    // TODO: Handle getInitialProps error.
    static async getInitialProps(context) {
      let pageInitialProps = {};
      if (Page.getInitialProps) {
        pageInitialProps = await Page.getInitialProps(context);
      }

      const { locale, messages, supportedLocales } =
        context.req || window.__NEXT_DATA__.props;

      // Note we call fetchQuery for client page transitions as well to enable
      // pending navigations. Finally possible with Next.js and Relay.
      // https://writing.pupius.co.uk/beyond-pushstate-building-single-page-applications-4353246f4480
      let queryProps = {};
      let queryRecords = {};
      if (options.query) {
        const environment = createRelayEnvironment();
        const variables = {};
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        queryProps = await fetchQuery(environment, options.query, variables);
        queryRecords = environment.getStore().getSource().toJSON();
      }

      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const initialNow = Date.now();

      return ({
        ...pageInitialProps,
        initialNow,
        locale,
        messages,
        queryProps,
        queryRecords,
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
      }: AppProps);
    }

    props: AppProps;
    environment: Object;
    reduxStore: Store;

    constructor(props: AppProps) {
      super(props);
      this.environment = createRelayEnvironment({
        records: props.queryRecords,
      });
      this.reduxStore = getReduxStore(props.serverState, this.environment);
    }

    componentDidMount() {
      // componentDidMount, because we have to restore persisted client state
      // after the initial render to prevent client/server HTML mismatch.
      persistStore(this.reduxStore, localForage);
    }

    render() {
      const {
        initialNow,
        locale,
        messages,
        queryProps,
        queryRecords,
        ...props
      } = this.props;

      return (
        <RelayProvider environment={this.environment} variables={{}}>
          <ReduxProvider store={this.reduxStore}>
            <FelaProvider renderer={felaRenderer}>
              <IntlProvider
                locale={locale}
                messages={messages}
                initialNow={initialNow}
              >
                <PageWithDefaultHOCs {...props} queryProps={queryProps} />
              </IntlProvider>
            </FelaProvider>
          </ReduxProvider>
        </RelayProvider>
      );
    }
  };
};

export default app;
