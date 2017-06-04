// @flow
import type { Store } from '../types';
import React from 'react';
import createApolloClient from '../lib/create-apollo-client';
import createReduxStore from '../lib/create-redux-store';
import localForage from 'localforage';
import persistStore from '../lib/persist-store';
import uuid from 'uuid';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as FelaProvider } from 'react-fela';
import { getRenderer, getMountNode } from '../lib/fela';

// App composition root.
// blog.ploeh.dk/2011/07/28/CompositionRoot
// TODO: Make it multi-platform probably via app.ios.js and app.android.js

const singletonOnClient = (create: Function) => {
  // $FlowFixMe Add process.browser to app.js.flow somehow.
  const isServer = !process.browser;
  let singleton;
  return (...args) => {
    if (isServer) return create(...args);
    if (!singleton) singleton = create(...args);
    return singleton;
  };
};

type ApolloClient = any;

const getApolloClient: () => ApolloClient = singletonOnClient(() =>
  createApolloClient(GRAPHQL_ENDPOINT)
);

const platformDependencies = {
  createUuid: uuid.v4,
};

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
const renderApp = (Page, apolloClient, reduxStore, props) =>
  <ApolloProvider client={apolloClient} store={reduxStore}>
    <FelaProvider renderer={getRenderer()} mountNode={getMountNode()}>
      <Page {...props} />
    </FelaProvider>
  </ApolloProvider>;

// facebook.github.io/react/docs/higher-order-components.html
// We need Component, because we need a componentDidMount.
// We need a componentDidMount, because client state must be loaded after
// the initial render, to match client and server HTML.
const app = (Page: any) =>
  class App extends React.Component {
    static async getInitialProps(ctx) {
      let serverState = {};
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (Page.getInitialProps) {
        composedInitialProps = await Page.getInitialProps(ctx);
      }
      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apolloClient: ApolloClient = getApolloClient();
        const reduxStore: Store = getReduxStore(apolloClient);
        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };
        // Run all graphql queries
        const app = renderApp(Page, apolloClient, reduxStore, {
          url,
          ...composedInitialProps,
        });
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
      return renderApp(Page, this.apolloClient, this.reduxStore, this.props);
    }
  };

export default app;
