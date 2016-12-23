/* @flow */
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import { Provider as Fela } from 'react-fela';
import { createRenderer } from 'fela-native';

type Props = {
  store: Object,
};

const renderer = createRenderer();

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    return (
      <Redux store={store}>
        <MemoryRouter>
          <Fela renderer={renderer}>
            <App />
          </Fela>
        </MemoryRouter>
      </Redux>
    );
  }

}

export default Root;
