// @flow
import testRenderer from 'react-test-renderer';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { createRenderer as createFelaRenderer } from 'fela';

export const createTestRenderer = (theme: any) => (Component: any) => {
  const felaRenderer = createFelaRenderer();
  const component = testRenderer.create(
    <FelaProvider renderer={felaRenderer}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </FelaProvider>
  );
  return {
    fela: felaRenderer.renderToString(),
    component: component.toJSON(),
  };
};

export const createExpectRender = (theme: any) => {
  const render = createTestRenderer(theme);
  return (Component: any) => expect(render(Component)).toMatchSnapshot();
};
