// @flow
import BaseRoot from './BaseRoot';
import React from 'react';
import renderError from './renderError';
import routeConfig from './routeConfig';
import { ScrollManager } from 'found-scroll';
import { createConnectedRouter, createRender, resolveElements } from 'found';

const ConnectedRouter = createConnectedRouter({
  render: renderArgs => (
    <ScrollManager renderArgs={renderArgs}>
      {createRender({ renderError })(renderArgs)}
    </ScrollManager>
  ),
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
