// @flow
import BaseRoot from './BaseRoot';
import ElementsRenderer from 'found/lib/ElementsRenderer';
import LoadingBar from './LoadingBar';
import React from 'react';
import renderError from './renderError';
import routeConfig from './routeConfig';
import { ScrollManager } from 'found-scroll';
import { createConnectedRouter, createRender, resolveElements } from 'found';

// StaticContainer ensures App is not rerendered on the pending state.
// We can't use react-static-container because some type clashes with RN.
class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps: Object) {
    return !!nextProps.shouldUpdate;
  }
  render() {
    const { children } = this.props;
    if (children === null || children === false) {
      return null;
    }
    return React.Children.only(children);
  }
}

export const createRouterRender = (renderArgs: any) => createRender({
  renderPending: () => (
    <div>
      <StaticContainer>
        {null}
      </StaticContainer>
      <LoadingBar />
    </div>
  ),
  renderReady: ({ elements }) => (
    <div>
      <StaticContainer shouldUpdate>
        <ElementsRenderer elements={elements} />
      </StaticContainer>
    </div>
  ),
  renderError,
})(renderArgs);

const ConnectedRouter = createConnectedRouter({
  render: renderArgs => (
    <ScrollManager renderArgs={renderArgs}>
      {createRouterRender(renderArgs)}
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
