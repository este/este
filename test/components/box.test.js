// @flow
import { computeBoxStyleAndProps } from '../../components/box';

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

// $FlowFixMe Don't fix. We test real values, not types.
const compute = (...args) => computeBoxStyleAndProps(theme, ...args);

test('unknown prop is passed to a component', () => {
  const { style, props } = compute({ unknownProp: 1 });
  expect(style).toEqual({});
  expect(props).toEqual({ unknownProp: 1 });
});

test('margin', () => {
  const { style, props } = compute({ margin: 1 });
  expect(style).toEqual({
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  });
  expect(props).toEqual({});
});

test('marginHorizontal', () => {
  const { style, props } = compute({ marginHorizontal: 1 });
  expect(style).toEqual({
    marginLeft: 24,
    marginRight: 24,
  });
  expect(props).toEqual({});
});

test('marginVertical', () => {
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
test('padding', () => {
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
