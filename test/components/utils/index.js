// @flow
import React from 'react';
import testRenderer from 'react-test-renderer';
import { Provider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import { renderToString } from 'fela-tools';

const prettifyFelaString = str => str.replace(/\.[a-z]+/g, '\n    $&');

export const createTestRenderer = (theme: any) => (Component: any) => {
  const renderer = createRenderer();
  const component = testRenderer.create(
    <Provider renderer={renderer}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </Provider>,
  );
  const fela = prettifyFelaString(renderToString(renderer));
  renderer.clear();
  return { fela, component: component.toJSON() };
};

export const createExpectRender = (theme: any) => {
  const render = createTestRenderer(theme);
  return (Component: any) => expect(render(Component)).toMatchSnapshot();
};
