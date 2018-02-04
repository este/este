// @flow
import * as React from 'react';
// $FlowFixMe
import testRenderer from 'react-test-renderer';
import { ThemeProvider } from '../../../components/Theme';

export const createTestRenderer = (theme: any) => (Component: any) => {
  const component = testRenderer.create(
    <ThemeProvider value={theme}>
      <Component />
    </ThemeProvider>,
  );
  return component.toJSON();
};

export const createExpectRender = (theme: any) => {
  const render = createTestRenderer(theme);
  return (Component: any) => expect(render(Component)).toMatchSnapshot();
};
