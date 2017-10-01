import * as React from 'react';
import testRenderer from 'react-test-renderer';
import ThemeProvider from '../../../components/ThemeProvider';

const prettifyFelaString = str => str.replace(/\.[a-z]+/g, '\n    $&');

export const createTestRenderer = (theme: any) => (Component: any) => {
  const component = testRenderer.create(
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>,
  );
  return component.toJSON();
};

export const createExpectRender = (theme: any) => {
  const render = createTestRenderer(theme);
  return (Component: any) => expect(render(Component)).toMatchSnapshot();
};
