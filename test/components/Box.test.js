// @flow
import React from 'react';
import Box from '../../components/Box';
import { createExpectRender } from './utils';

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

const expectRender = createExpectRender(theme);

test('render', () => {
  expectRender(() => <Box />);
});

test('render with children', () => {
  expectRender(() => (
    <Box>
      <div>div</div>
    </Box>
  ));
});

test('as', () => {
  const SomeComponent = jest.fn(() => null);
  const SomeComponentStyledAsBox = props => (
    // $FlowFixMe
    <Box as={SomeComponent} {...props} />
  );
  expectRender(() => <SomeComponentStyledAsBox someCustomProp="1" />);
  expect(SomeComponent).toHaveBeenCalledTimes(1);
  expect(SomeComponent.mock.calls[0][0]).toEqual({
    className: 'a b c',
    someCustomProp: '1',
  });
});

test('style', () => {
  expectRender(() => <Box style={{ backgroundColor: 'red' }} />);
});

test('style ignores undefined values', () => {
  expectRender(() => (
    <Box
      style={{
        display: undefined,
        flexDirection: undefined,
        position: undefined,
      }}
    />
  ));
});

test('margin explicit', () => {
  expectRender(() => <Box margin="auto" />);
});

test('margin rhythm', () => {
  expectRender(() => <Box margin={1} />);
});

test('marginLeft rhythm', () => {
  expectRender(() => <Box marginLeft={1} />);
});

test('marginLeft overriden by style marginLeft', () => {
  expectRender(() => <Box marginLeft={1} style={{ marginLeft: 2 }} />);
});

test('marginHorizontal', () => {
  expectRender(() => <Box marginHorizontal={1} />);
});

test('marginVertical', () => {
  expectRender(() => <Box marginVertical={1} />);
});

test('margin bottom left right top', () => {
  expectRender(() => (
    <Box marginBottom={1} marginLeft={2} marginRight={3} marginTop={4} />
  ));
});

test('margin shorthands are order independent', () => {
  [
    { margin: 1, marginVertical: 2, marginBottom: 3 },
    { margin: 1, marginBottom: 3, marginVertical: 2 },
    { marginVertical: 2, marginBottom: 3, margin: 1 },
    { marginVertical: 2, margin: 1, marginBottom: 3 },
    { marginBottom: 3, marginVertical: 2, margin: 1 },
    { marginBottom: 3, margin: 1, marginVertical: 2 },
    { margin: 1, marginLeft: 2 },
    { marginLeft: 2, margin: 1 },
  ].forEach(props => {
    expectRender(() => <Box {...props} />);
  });
});

// Only one test, because the implementation is the same as for margin.
test('padding', () => {
  expectRender(() => <Box padding={1} />);
});

test('other maybe rhythm props', () => {
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
    expectRender(() => <Box {...{ [prop]: 1 }} />);
    expectRender(() => <Box {...{ [prop]: '1%' }} />);
  });
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
    'borderStyle',
  ].forEach(prop => {
    expectRender(() => <Box {...{ [prop]: 'foo' }} />);
  });
});

// https://github.com/necolas/react-native-web expandStyle-test.js
test('flex shorthand', () => {
  expectRender(() => <Box flex={1} />);
  expectRender(() => <Box flex={1} flexShrink={2} />);
  expectRender(() => <Box flex={1} flexShrink={2} flexBasis="3px" />);
  expectRender(() => <Box flex={3} flexShrink={2} flexBasis="1px" />);
});

// http://facebook.github.io/react-native/releases/0.43/docs/layout-props.html#flex
test('flex throws for not yet supported value', () => {
  expect(() => {
    expectRender(() => <Box flex={0} />);
  }).toThrowError();
  expect(() => {
    expectRender(() => <Box flex={-1} />);
  }).toThrowError();
});

test('backgroundColor', () => {
  expectRender(() => <Box backgroundColor="primary" />);
});

test('border width', () => {
  expectRender(() => <Box borderWidth={1} />);
  expectRender(() => <Box borderBottomWidth={1} />);
  expectRender(() => <Box borderWidth={1} borderBottomWidth={2} />);
});

test('border radius shorthand', () => {
  expectRender(() => <Box borderRadius={1} />);
  expectRender(() => <Box borderBottomLeftRadius={2} />);
  expectRender(() => <Box borderRadius={1} borderBottomLeftRadius={2} />);
});

test('border color shorthand', () => {
  expectRender(() => <Box borderColor="primary" />);
  expectRender(() => <Box borderBottomColor="success" />);
  expectRender(() => <Box borderColor="primary" borderBottomColor="success" />);
});

test('ensure rhythm via padding compensation', () => {
  expectRender(() => <Box padding={1} borderWidth={1} />);
  expectRender(() => <Box paddingTop={1} borderTopWidth={1} />);
  expectRender(() => <Box paddingTop={1} borderTopWidth={25} />);
  expectRender(() => <Box paddingLeft={1} borderLeftWidth={1} />);
  expectRender(() => <Box paddingLeft={1} borderLeftWidth={25} />);
});

describe('ReactNative', () => {
  test('render', () => {
    expectRender(() => <Box margin={1} isReactNative />);
  });

  test('flex shorthand', () => {
    expectRender(() => <Box flex={1} isReactNative />);
    expectRender(() => <Box flex={1} flexShrink={2} isReactNative />);
    expectRender(() => (
      <Box flex={1} flexShrink={2} flexBasis="3px" isReactNative />
    ));
    expectRender(() => (
      <Box flex={3} flexShrink={2} flexBasis="1px" isReactNative />
    ));
  });
});
