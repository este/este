/* @flow */
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';

type Props = {
  store: Object,
};

// We needs such Root for vanilla hot reloading.
const Root = ({ store }: Props) => (
  <Redux store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Redux>
);

export default Root;
