/* @flow */
import App from './App';
import React from 'react';
import RoutingProvider from '../routing/RoutingProvider';
import createRoutes from '../createRoutes';
import { Provider } from 'react-redux';

type Props = {
  store: Object,
};

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    const routes = createRoutes(store.getState);
    return (
      <Provider store={store}>
        <RoutingProvider routes={routes}>
          <App />
        </RoutingProvider>
      </Provider>
    );
  }

}

export default Root;
