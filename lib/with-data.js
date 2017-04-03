// @flow
import React from 'react';
import initReduxStore from './redux/init-store';
import type { Action, State } from '../types';
import type { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

type Props = {
  initialState: State,
};

// Higher order component for data.
// Based on github.com/zeit/next.js/tree/master/examples/with-apollo-and-redux
const withData = (Component: () => React.Element<*>) =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const initialState = {
        app: { online: false },
      };
      const store = initReduxStore(initialState);
      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...(await (Component.getInitialProps
          ? Component.getInitialProps(ctx)
          : {})),
      };
      const state = store.getState();

      return {
        ...props,
        initialState: {
          ...state,
        },
        headers,
      };
    }

    props: Props;
    store: Store<State, Action>;

    constructor(props: Props) {
      super(props);
      const { initialState } = this.props;
      this.store = initReduxStore(initialState);
    }

    render() {
      return (
        <ReduxProvider store={this.store}>
          <Component {...this.props} />
        </ReduxProvider>
      );
    }
  };

export default withData;
