// @flow
import React from 'react';
import createApolloClient from '../lib/create-apollo-client';
import createReduxStore from '../lib/create-redux-store';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as FelaProvider } from 'react-fela';
import { getRenderer, getMountNode } from '../lib/fela';

// App composition root.
// blog.ploeh.dk/2011/07/28/CompositionRoot

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

const getApolloClient = singletonOnClient(() =>
  createApolloClient(GRAPHQL_ENDPOINT)
);

const getReduxStore = singletonOnClient((client, initialState = {}) => {
  const platformReducers = { apollo: client.reducer() };
  const platformMiddlewares = [client.middleware()];
  return createReduxStore(initialState, {
    platformReducers,
    platformMiddlewares,
  });
});

// ApolloProvider provides also react-redux Provider. Nice.
const renderApp = (Page, client, store, props) => (
  <ApolloProvider client={client} store={store}>
    <FelaProvider renderer={getRenderer()} mountNode={getMountNode()}>
      <Page {...props} />
    </FelaProvider>
  </ApolloProvider>
);

const createGetInitialProps = Page => async ctx => {
  let serverState = {};

  // Evaluate the composed component's getInitialProps()
  let composedInitialProps = {};
  if (Page.getInitialProps) {
    composedInitialProps = await Page.getInitialProps(ctx);
  }

  // Run all graphql queries in the component tree
  // and extract the resulting data
  if (!process.browser) {
    const client = getApolloClient();
    const store = getReduxStore(client);

    // Provide the `url` prop data in case a graphql query uses it
    const url = { query: ctx.query, pathname: ctx.pathname };

    // Run all graphql queries
    const app = renderApp(Page, client, store, {
      url,
      ...composedInitialProps,
    });
    await getDataFromTree(app);

    // Extract query data from the store
    const state = store.getState();

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
};

// Higher order component.
// facebook.github.io/react/docs/higher-order-components.html
const app = (Page: any) => {
  const App = (props: { serverState: Object }) => {
    const client = getApolloClient();
    const store = getReduxStore(client, props.serverState);
    return renderApp(Page, client, store, props);
  };
  App.getInitialProps = createGetInitialProps(Page);
  return App;
};

export default app;
