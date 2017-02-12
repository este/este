// @flow
import BaseRoot from './BaseRoot';
import Error from './Error';
import React from 'react';
import routeConfig from './routeConfig';
import { createConnectedRouter, createRender, resolveElements } from 'found';

const ConnectedRouter = createConnectedRouter({
  render: createRender({ renderError: Error }),
});

type RootProps = {
  renderArgs: Object,
  store: Object,
};

const Root = ({ renderArgs, store }: RootProps) => (
  <BaseRoot store={store}>
    <ConnectedRouter
      initialRenderArgs={renderArgs}
      matchContext={{ store }}
      resolveElements={resolveElements}
    />
  </BaseRoot>
);

// For hot reloading.
Root.routeConfig = routeConfig;

export default Root;
