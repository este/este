// @flow
import Box, { computeBoxStyleAndProps } from '../../components/box';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { createRenderer as createFelaRenderer } from 'fela';

const browserDefaultStyle = {
  // Enforce React Native behaviour for browsers.
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
};

const theme = {
  typography: {
    fontSize: level => level + 16,
    rhythm: ratio => 24 * ratio,
    lineHeight: 24,
  },
  colors: {
    primary: 'blue',
    success: 'green',
    warning: 'orange',
    danger: 'red',
    black: 'black',
    white: 'white',
    gray: 'gray',
  },
};

const compute = props =>
  // $FlowFixMe Don't fix. We test real values, not types.
  computeBoxStyleAndProps(props, { isReactNative: true, theme });

const computeBrowser = props =>
  // $FlowFixMe Don't fix. We test real values, not types.
  computeBoxStyleAndProps(props, { isReactNative: false, theme });

test('render', () => {
  const felaRenderer = createFelaRenderer();
  const component = renderer.create(
    <FelaProvider renderer={felaRenderer}>
      <ThemeProvider theme={theme}>
        <Box margin={1} />
      </ThemeProvider>
    </FelaProvider>
  );
  expect(felaRenderer.renderToString()).toMatchSnapshot();
  expect(component.toJSON()).toMatchSnapshot();
});

test('unknown prop is passed to a component', () => {
  const { style, props } = compute({ unknownProp: 1 });
  expect(style).toEqual({});
  expect(props).toEqual({ unknownProp: 1 });
});

test('margin shorthand', () => {
  const { style, props } = compute({ margin: 1 });
  expect(style).toEqual({
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  });
  expect(props).toEqual({});
});

test('marginHorizontal shorthand', () => {
  const { style, props } = compute({ marginHorizontal: 1 });
  expect(style).toEqual({
    marginLeft: 24,
    marginRight: 24,
  });
  expect(props).toEqual({});
});

test('marginVertical shorthand', () => {
  const { style, props } = compute({ marginVertical: 1 });
  expect(style).toEqual({
    marginBottom: 24,
    marginTop: 24,
  });
  expect(props).toEqual({});
});

test('marginBottom', () => {
  const { style, props } = compute({
    marginBottom: 1,
  });
  expect('marginLeft' in style).toBeFalsy();
  expect(style).toEqual({ marginBottom: 24 });
  expect(props).toEqual({});
});

test('margin bottom left right top', () => {
  const { style, props } = compute({
    marginBottom: 1,
    marginLeft: 2,
    marginRight: 3,
    marginTop: 4,
  });
  expect(style).toEqual({
    marginBottom: 24,
    marginLeft: 48,
    marginRight: 72,
    marginTop: 96,
  });
  expect(props).toEqual({});
});

test('margin shorthands are order independent', () => {
  // all permutations
  [
    { margin: 1, marginVertical: 2, marginBottom: 3 },
    { margin: 1, marginBottom: 3, marginVertical: 2 },
    { marginVertical: 2, marginBottom: 3, margin: 1 },
    { marginVertical: 2, margin: 1, marginBottom: 3 },
    { marginBottom: 3, marginVertical: 2, margin: 1 },
    { marginBottom: 3, margin: 1, marginVertical: 2 },
  ].forEach(props => {
    const { style } = compute(props);
    expect(style).toEqual({
      marginBottom: 72,
      marginLeft: 24,
      marginRight: 24,
      marginTop: 48,
    });
  });

  const { style: style1 } = compute({
    marginLeft: 2,
    margin: 1,
  });
  expect(style1).toEqual({
    marginBottom: 24,
    marginLeft: 48,
    marginRight: 24,
    marginTop: 24,
  });

  const { style: style2 } = compute({
    margin: 1,
    marginLeft: 2,
  });
  expect(style2).toEqual({
    marginBottom: 24,
    marginLeft: 48,
    marginRight: 24,
    marginTop: 24,
  });
});

// Just one test, because the implementation is the same as for margin.
test('padding shorthand', () => {
  const { style, props } = compute({ padding: 1 });
  expect(style).toEqual({
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
  });
  expect(props).toEqual({});
});

test('just value style props', () => {
  [
    'alignItems',
    'alignSelf',
    'flex',
    'flexBasis',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'justifyContent',
    'opacity',
    'overflow',
    'position',
    'zIndex',
    'borderStyle',
  ].forEach(prop => {
    const { style, props } = compute({ [prop]: 'foo' });
    expect(style).toEqual({ [prop]: 'foo' });
    expect(props).toEqual({});
  });
});

test('not shorthand rhythm props', () => {
  [
    'height',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'width',
    'bottom',
    'left',
    'right',
    'top',
  ].forEach(prop => {
    const { style, props } = compute({ [prop]: 1 });
    expect(style).toEqual({ [prop]: 24 });
    expect(props).toEqual({});
  });
});

// Everything is display: flex by default. All the behaviors of block and
// inline-block can be expressed in term of flex but not the opposite.
// https://facebook.github.io/yoga
// necolas/react-native-web
test('React Native View behaviour for web', () => {
  const { style, props } = computeBrowser({});
  expect(style).toEqual(browserDefaultStyle);
});

// http://facebook.github.io/react-native/releases/0.43/docs/layout-props.html#flex
test('flex throws for not yet supported value', () => {
  const flex0 = () => compute({ flex: 0 });
  expect(flex0).toThrowError();
  const flexNegative1 = () => compute({ flex: -1 });
  expect(flexNegative1).toThrowError();
});

test('flex shorthand for React Native', () => {
  const { style, props } = compute({ flex: 1 });
  expect(style).toEqual({ flex: 1 });
});

// https://github.com/necolas/react-native-web expandStyle-test.js
test('flex shorthand for browser', () => {
  const { style: style1 } = computeBrowser({ flex: 1 });
  expect(style1).toEqual({
    ...browserDefaultStyle,
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
  });

  const { style: style2 } = computeBrowser({ flexShrink: 2, flex: 1 });
  expect(style2).toEqual({
    ...browserDefaultStyle,
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 2,
  });

  const { style: style3 } = computeBrowser({
    flexBasis: '1px',
    flexShrink: 2,
    flex: 1,
  });
  expect(style3).toEqual({
    ...browserDefaultStyle,
    flexBasis: '1px',
    flexGrow: 1,
    flexShrink: 2,
  });
});

test('backgroundColor', () => {
  const { style } = compute({ backgroundColor: 'primary' });
  expect(style).toEqual({ backgroundColor: 'blue' });
});

test('border width shorthand', () => {
  const { style: style1 } = compute({ borderWidth: 1 });
  expect(style1).toEqual({
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  });

  const { style: style2 } = compute({ borderBottomWidth: 2 });
  expect(style2).toEqual({
    borderBottomWidth: 2,
  });

  const { style: style3 } = compute({ borderWidth: 1, borderBottomWidth: 2 });
  expect(style3).toEqual({
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  });
});

test('border radius shorthand', () => {
  const { style: style1 } = compute({ borderRadius: 1 });
  expect(style1).toEqual({
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  });

  const { style: style2 } = compute({ borderBottomLeftRadius: 2 });
  expect(style2).toEqual({
    borderBottomLeftRadius: 2,
  });

  const { style: style3 } = compute({
    borderRadius: 1,
    borderBottomLeftRadius: 2,
  });
  expect(style3).toEqual({
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  });
});

test('border color shorthand', () => {
  const { style: style1 } = compute({ borderColor: 'primary' });
  expect(style1).toEqual({
    borderBottomColor: 'blue',
    borderLeftColor: 'blue',
    borderRightColor: 'blue',
    borderTopColor: 'blue',
  });

  const { style: style2 } = compute({ borderBottomColor: 'success' });
  expect(style2).toEqual({
    borderBottomColor: 'green',
  });

  const { style: style3 } = compute({
    borderColor: 'primary',
    borderBottomColor: 'success',
  });
  expect(style3).toEqual({
    borderBottomColor: 'green',
    borderLeftColor: 'blue',
    borderRightColor: 'blue',
    borderTopColor: 'blue',
  });
});

test('as', () => {
  const Component = jest.fn(() => null);
  const StyledComponent = props => <Box as={Component} {...props} />;
  renderer.create(
    <FelaProvider renderer={createFelaRenderer()}>
      <ThemeProvider theme={theme}>
        <StyledComponent someProp="1" height={2} />
      </ThemeProvider>
    </FelaProvider>
  );
  expect(Component).toHaveBeenCalledTimes(1);
  expect(Component.mock.calls[0][0]).toEqual({
    className: 'a b c d e',
    someProp: '1',
  });
});

test('rhythm compensation');
test('rawStyle');
