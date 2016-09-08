/* @flow */
import App from './App';
import React from 'react';
import createRoutes from '../createRoutes';
import { Provider } from 'react-redux';

type Props = {
  store: Object,
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <App routes={createRoutes()} />
  </Provider>
);

export default Root;
