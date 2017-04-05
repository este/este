// @flow
import type { State } from '../types';
import React from 'react';
import initApolloClient from './apollo/init-client';
import initReduxStore from './init-store';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as FelaProvider } from 'react-fela';
import { getRenderer, getMountNode } from './fela';

type Props = {
  headers: Object,
  initialState: State,
};

const initReduxStoreWith = client => {
  const reducers = {
    apollo: client.reducer(),
  };
  const middlewares = [client.middleware()];
  return initReduxStore(client.initialState, {
    reducers,
    middlewares,
  });
};

// ApolloProvider provides also react-redux Provider. Nice.
const createAppWithProviders = (Component, client, store, props) => (
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
    const client = initApolloClient(headers, initialState);
    const store = initReduxStoreWith(client);

    const props = {
      url: { query: ctx.query, pathname: ctx.pathname },
      ...(await (Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : {})),
    };

    if (!process.browser) {
      const app = createAppWithProviders(Component, client, store, props);
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

// Higher order component for data.
// Based on github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux
const app = (Component: any) => {
  const App = (props: Props) => {
    const { headers, initialState } = props;
    const client = initApolloClient(headers, initialState);
    const store = initReduxStoreWith(client);
    return createAppWithProviders(Component, client, store, props);
  };
  App.getInitialProps = createGetInitialProps(Component);
  return App;
};

export default app;
