// @flow
import type { IntlShape } from 'react-intl';
import type { Store, AppState, FunctionalComponent } from '../types';
import React from 'react';
import createApolloClient from '../lib/create-apollo-client';
import createReduxStore from '../lib/create-redux-store';
import felaRenderer from '../lib/fela-renderer';
import localForage from 'localforage';
import persistStore from '../lib/persist-store';
import uuid from 'uuid';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { Provider as FelaProvider } from 'react-fela';

// App composition root.
// http://blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform probably via app.ios.js and app.android.js
// TODO: Add Flow types.

if (typeof window !== 'undefined') {
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
  createApolloClient(),
);

const getReduxStore = singletonOnClient((apolloClient, initialState) => {
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
  IntlPage,
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
        <IntlPage {...props} />
      </IntlProvider>
    </FelaProvider>
  </ApolloProvider>;

type PageProps = {
  // TODO: Waiting for Next.js 3 type definitions.
  url: {
    pathname: string,
  },
  intl: IntlShape,
};

type Page = FunctionalComponent<PageProps>;

const app = (Page: Page) => {
  const IntlPage = injectIntl(Page);
  // We need Class because we need a componentDidMount.
  // We need a componentDidMount because client state must be rendered after
  // the initial render, to prevent client and server HTML mismatch.
  return class App extends React.Component {
    static async getInitialProps(context) {
      // Evaluate the composed component's getInitialProps().
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(context);
      }

      // Get props from the request object on the server.
      const { req } = context;
      const { locale, messages, supportedLocales } =
        req || window.__NEXT_DATA__.props;

      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const initialNow = Date.now();

      let serverState = {
        app: ({
          baselineShown: false,
          darkEnabled: false,
          errors: null,
          name: APP_NAME,
          version: APP_VERSION,
          locale,
          defaultLocale: DEFAULT_LOCALE,
          supportedLocales,
        }: AppState),
      };

      // Run all graphql queries in the component tree
      // and extract the resulting data.
      // TODO: https://github.com/apollographql/react-apollo/issues/631#issuecomment-312451587
      if (!process.browser) {
        const apolloClient: ApolloClient = getApolloClient();
        const reduxStore: Store = getReduxStore(apolloClient, serverState);

        // Provide the `url` prop data in case a graphql query uses it.
        const url = { query: context.query, pathname: context.pathname };

        // Run all graphql queries.
        const app = renderApp(
          IntlPage,
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

        // Clear felaRenderer after every render because it's stateful.
        felaRenderer.clear();

        // Extract query data from the reduxStore.
        const state = reduxStore.getState();

        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway.
        serverState = {
          ...serverState,
          apollo: {
            // Make sure to only include Apollo's data state
            data: state.apollo.data,
          },
        };
      }

      return {
        ...composedInitialProps,
        initialNow,
        locale,
        messages,
        serverState,
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
      const {
        initialNow,
        locale,
        messages,
        serverState,
        ...props
      } = this.props;
      return renderApp(
        IntlPage,
        this.apolloClient,
        this.reduxStore,
        locale,
        messages,
        initialNow,
        props,
      );
    }
  };
};

export default app;
