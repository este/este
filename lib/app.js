// @flow
import type { State } from '../types';
import React from 'react';
import createApolloClient from './create-apollo-client';
import createReduxStore from './create-redux-store';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as FelaProvider } from 'react-fela';
import { getRenderer, getMountNode } from './fela';

// App composition root.
// blog.ploeh.dk/2011/07/28/CompositionRoot

const singletonOnClient = (create: Function) => {
  // $FlowFixMe;
  const isServer = !process.browser;
  let singleton;
  return (...args) => {
    if (isServer) return create(...args);
    if (!singleton) singleton = create(...args);
    return singleton;
  };
};

const getApolloClient = singletonOnClient((headers, initialState) =>
  createApolloClient(BACKEND_URL, headers, initialState));

const getReduxStore = singletonOnClient(client => {
  const platformReducers = { apollo: client.reducer() };
  const platformMiddlewares = [client.middleware()];
  return createReduxStore(client.initialState, {
    platformReducers,
    platformMiddlewares,
  });
});

// ApolloProvider provides also react-redux Provider. Nice.
const createApp = (Component, client, store, props) => (
  <ApolloProvider client={client} store={store}>
    <FelaProvider renderer={getRenderer()} mountNode={getMountNode()}>
      <Component {...props} />
    </FelaProvider>
  </ApolloProvider>
);

const createGetInitialProps = Component =>
  async ctx => {
    const headers = ctx.req ? ctx.req.headers : {};
    const initialState = {};
    const client = getApolloClient(headers, initialState);
    const store = getReduxStore(client);

    const props = {
      url: { query: ctx.query, pathname: ctx.pathname },
      ...(await (Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : {})),
    };

    if (!process.browser) {
      const app = createApp(Component, client, store, props);
      await getDataFromTree(app);
      // TODO: Do we need it?
      // github.com/apollographql/react-apollo/issues/536#issuecomment-287153964
      // getRenderer().clear();
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
const app = (Component: any) => {
  const App = (
    props: {
      headers: Object,
      initialState: State,
    }
  ) => {
    const { headers, initialState } = props;
    const client = getApolloClient(headers, initialState);
    const store = getReduxStore(client);
    return createApp(Component, client, store, props);
  };
  App.getInitialProps = createGetInitialProps(Component);
  return App;
};

export default app;