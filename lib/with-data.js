// @flow
import type { State } from '../types';
import React from 'react';
import initApolloClient from './apollo/init-client';
import initReduxStore from './redux/init-store';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

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

const createApolloProvider = (Component, client, store, props) => (
  <ApolloProvider client={client} store={store}>
    <Component {...props} />
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
      const app = createApolloProvider(Component, client, store, props);
      await getDataFromTree(app);
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
const withData = (Component: () => React.Element<*>) => {
  const WithData = (props: Props) => {
    const { headers, initialState } = props;
    const client = initApolloClient(headers, initialState);
    const store = initReduxStoreWith(client);
    // ApolloProvider provides also react-redux Provider. Nice.
    return createApolloProvider(Component, client, store, props);
  };
  WithData.getInitialProps = createGetInitialProps(Component);
  return WithData;
};

export default withData;
