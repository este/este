// @flow
import React from 'react';
import testRenderer from 'react-test-renderer';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { createRenderer as createFelaRenderer } from 'fela';

const prettifyFelaString = str => str.replace(/\.[a-z]+/g, '\n    $&');

export const createTestRenderer = (theme: any) => (Component: any) => {
  const felaRenderer = createFelaRenderer();
  const component = testRenderer.create(
    <FelaProvider renderer={felaRenderer}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </FelaProvider>,
  );
  return {
    fela: prettifyFelaString(felaRenderer.renderToString()),
    component: component.toJSON(),
  };
};

export const createExpectRender = (theme: any) => {
  const render = createTestRenderer(theme);
  return (Component: any) => expect(render(Component)).toMatchSnapshot();
};
