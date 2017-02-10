// @flow
import BaseRoot from './BaseRoot';
import Error from './Error';
import React from 'react';
import routeConfig from './routeConfig';
import { createConnectedRouter, createRender, resolveElements } from 'found';

const ConnectedRouter = createConnectedRouter({
  render: createRender({ renderError: Error }),
});

const Root = ({ store }: { store: Object }) => (
  <BaseRoot store={store}>
    <ConnectedRouter resolveElements={resolveElements} />
  </BaseRoot>
);

Root.routeConfig = routeConfig;

export default Root;
