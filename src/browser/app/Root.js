// @flow
import App from './App';
import BaseRoot from './BaseRoot';
import React from 'react';
import { BrowserRouter } from 'react-router';

type RootProps = {
  store: Object,
};

// We needs such Root also for vanilla hot reloading.
const Root = ({ store }: RootProps) => (
  <BaseRoot store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BaseRoot>
);

export default Root;
