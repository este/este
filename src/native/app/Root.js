/* @flow */
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';

type Props = {
  store: Object,
};

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    return (
      <Redux store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Redux>
    );
  }

}

export default Root;
