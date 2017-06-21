// @flow
import type { Store } from '../types';
import React from 'react';
import createApolloClient from '../lib/create-apollo-client';
import createReduxStore from '../lib/create-redux-store';
import felaRenderer from '../lib/fela-renderer';
import localForage from 'localforage';
import persistStore from '../lib/persist-store';
import uuid from 'uuid';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';

// App composition root.
// http://blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform probably via app.ios.js and app.android.js

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();

  // Register React Intl's locale data for the user's locale in the browser. This
  // locale data was added to the page by `pages/_document.js`. This only happens
  // once, on initial page load in the browser.
  if (window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach(lang => {
      addLocaleData(window.ReactIntlLocaleData[lang]);
    });
  }
}

type ApolloClient = any;

const platformDependencies = {
  createUuid: uuid.v4,
};

const singletonOnClient = (create: Function) => {
  let singleton;
  return (...args) => {
    if (!process.browser) return create(...args);
    if (!singleton) singleton = create(...args);
    return singleton;
  };
};

const getApolloClient: () => ApolloClient = singletonOnClient(() =>
  createApolloClient(GRAPHQL_ENDPOINT),
);

const getReduxStore = singletonOnClient((apolloClient, initialState = {}) => {
  const platformReducers = { apollo: apolloClient.reducer() };
  const platformMiddleware = [apolloClient.middleware()];
  return createReduxStore(initialState, {
    platformDependencies,
    platformReducers,
    platformMiddleware,
  });
});

// renderApp as separated function, because it's used for Apollo getDataFromTree
// ApolloProvider provides also react-redux Provider.
const renderApp = (
  Page,
  apolloClient,
  reduxStore,
  locale,
  messages,
  initialNow,
  props,
) =>
  <ApolloProvider client={apolloClient} store={reduxStore}>
    <FelaProvider renderer={felaRenderer}>
      <IntlProvider locale={locale} messages={messages} initialNow={initialNow}>
        <Page {...props} />
      </IntlProvider>
    </FelaProvider>
  </ApolloProvider>;

// facebook.github.io/react/docs/higher-order-components.html
// We need Component, because we need a componentDidMount.
// We need a componentDidMount, because client state must be loaded after
// the initial render, to match client and server HTML.
const app = (Page: any) =>
  class App extends React.Component {
    static async getInitialProps(context) {
      let serverState = {};

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(context);
      }

      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.
      const { req } = context;
      const { locale, messages } = req || window.__NEXT_DATA__.props;
      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const initialNow = Date.now();

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apolloClient: ApolloClient = getApolloClient();
        const reduxStore: Store = getReduxStore(apolloClient);
        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: context.query, pathname: context.pathname };
        // Run all graphql queries
        const app = renderApp(
          Page,
          apolloClient,
          reduxStore,
          locale,
          messages,
          initialNow,
          {
            url,
            ...composedInitialProps,
          },
        );
        await getDataFromTree(app);
        // Extract query data from the reduxStore
        const state = reduxStore.getState();
        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: {
            // Make sure to only include Apollo's data state
            data: state.apollo.data,
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
        locale,
        messages,
        initialNow,
      };
    }

    apolloClient: ApolloClient;
    reduxStore: Store;

    constructor(props: any) {
      super(props);
      this.apolloClient = getApolloClient();
      this.reduxStore = getReduxStore(this.apolloClient, props.serverState);
    }

    componentDidMount() {
      // Remember, componentDidMount is called only on the client-side.
      persistStore(this.reduxStore, localForage);
    }

    render() {
      const { locale, messages, initialNow, ...props } = this.props;
      return renderApp(
        Page,
        this.apolloClient,
        this.reduxStore,
        locale,
        messages,
        initialNow,
        props,
      );
    }
  };

export default app;
