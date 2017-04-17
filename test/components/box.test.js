// @flow
import { computeBoxStyleAndProps } from '../../components/box';

test('unknown props are passed to a component', () => {
  const { style, props } = computeBoxStyleAndProps({ unknownProp: 1 });
  expect(style).toEqual({});
  expect(props).toEqual({ unknownProp: 1 });
});

test('margin', () => {
  const { style, props } = computeBoxStyleAndProps({ margin: 1 });
  expect(style).toEqual({
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
  });
  expect(props).toEqual({});
});

test('marginHorizontal', () => {
  const { style, props } = computeBoxStyleAndProps({ marginHorizontal: 1 });
  expect(style).toEqual({
    marginLeft: 1,
    marginRight: 1,
  });
  expect(props).toEqual({});
});

test('marginVertical', () => {
  const { style, props } = computeBoxStyleAndProps({ marginVertical: 1 });
  expect(style).toEqual({
    marginBottom: 1,
    marginTop: 1,
  });
  expect(props).toEqual({});
});

test('margin bottom left right top', () => {
  const { style, props } = computeBoxStyleAndProps({
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
  });
  expect(style).toEqual({
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 1,
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
    const { style } = computeBoxStyleAndProps(props);
    expect(style).toEqual({
      marginBottom: 3,
      marginLeft: 1,
      marginRight: 1,
      marginTop: 2,
    });
  });
  const { style: style1 } = computeBoxStyleAndProps({
    marginLeft: 2,
    margin: 1,
  });
  expect(style1).toEqual({
    marginBottom: 1,
    marginLeft: 2,
    marginRight: 1,
    marginTop: 1,
  });
  const { style: style2 } = computeBoxStyleAndProps({
    margin: 1,
    marginLeft: 2,
  });
  expect(style2).toEqual({
    marginBottom: 1,
    marginLeft: 2,
    marginRight: 1,
    marginTop: 1,
  });
});

// Just one test, because the implementation is the same as margin.
test('padding', () => {
  const { style, props } = computeBoxStyleAndProps({ padding: 1 });
  expect(style).toEqual({
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 1,
  });
  expect(props).toEqual({});
});

test('style props without transformation', () => {
  [
    'height',
    'minHeight',
    'maxHeight',
    'width',
    'minWidth',
    'maxWidth',
    'bottom',
    'left',
    'right',
    'top',
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
    const { style, props } = computeBoxStyleAndProps({ [prop]: 1 });
    expect(style).toEqual({ [prop]: 1 });
    expect(props).toEqual({});
  });
});

// rhythm
// value => typeof value === 'number' ? rhythm(value) : value
