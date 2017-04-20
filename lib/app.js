// @flow
import type { State } from '../types';
import React from 'react';
import createApolloClient from './create-apollo-client';
import createReduxStore from './create-redux-store';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { getRenderer, getMountNode } from './fela';
import browerTheme from '../themes/browser-theme';

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

const getApolloClient = singletonOnClient((headers, initialState) =>
  createApolloClient(GRAPHQL_ENDPOINT, headers, initialState)
);

const getReduxStore = singletonOnClient(client => {
  const platformReducers = { apollo: client.reducer() };
  const platformMiddlewares = [client.middleware()];
  return createReduxStore(client.initialState, {
    platformReducers,
    platformMiddlewares,
  });
});

// ApolloProvider provides also react-redux Provider. Nice.
const renderApp = (Page, client, store, props) => (
  <ApolloProvider client={client} store={store}>
    <FelaProvider renderer={getRenderer()} mountNode={getMountNode()}>
      <ThemeProvider theme={browerTheme}>
        <Page {...props} />
      </ThemeProvider>
    </FelaProvider>
  </ApolloProvider>
);

const createGetInitialProps = Page => async ctx => {
  const headers = ctx.req ? ctx.req.headers : {};
  const initialState = {};
  const client = getApolloClient(headers, initialState);
  const store = getReduxStore(client);

  const props = {
    url: { query: ctx.query, pathname: ctx.pathname },
    ...(await (Page.getInitialProps ? Page.getInitialProps(ctx) : {})),
  };

  if (!process.browser) {
    const app = renderApp(Page, client, store, props);
    await getDataFromTree(app);
    // github.com/apollographql/react-apollo/issues/536#issuecomment-287153964
    getRenderer().clear();
  }

  const state = store.getState();

  return {
    ...props,
    headers,
    initialState: {
      ...state,
      apollo: {
        data: client.getInitialState().data,
      },
    },
  };
};

// Higher order component.
// facebook.github.io/react/docs/higher-order-components.html
const app = (Page: any) => {
  const App = (
    props: {
      headers: Object,
      initialState: State,
    }
  ) => {
    const { headers, initialState } = props;
    const client = getApolloClient(headers, initialState);
    const store = getReduxStore(client);
    return renderApp(Page, client, store, props);
  };
  App.getInitialProps = createGetInitialProps(Page);
  return App;
};

export default app;
