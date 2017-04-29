// @flow
import Box from '../../components/box';
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
  expectRender(() => <Box margin={1} />);
});

test('rawStyle overrides props', () => {
  expectRender(() => <Box marginLeft={1} rawStyle={{ marginLeft: 2 }} />);
});

test('style theme arg', () => {
  const style = jest.fn(() => {});
  expectRender(() => <Box style={style} />);
  expect(style).toHaveBeenCalledTimes(1);
  expect(style.mock.calls[0][0]).toEqual(theme);
});

test('style mixStyles arg', () => {
  const Foo = props => <Box style={(theme, mixStyles) => mixStyles(props)} />;
  expectRender(() => <Foo style={() => ({ margin: 1 })} />);
});

test('style overrides props', () => {
  expectRender(() => (
    <Box
      marginLeft={1}
      style={() => ({
        marginLeft: 2,
      })}
    />
  ));
});

test('rawStyle from style overrides props', () => {
  expectRender(() => (
    <Box
      marginLeft={1}
      style={() => ({
        rawStyle: {
          marginLeft: 2,
        },
      })}
    />
  ));
});

test('as to pass props to any component', () => {
  const SomeComponent = jest.fn(() => null);
  const SomeComponentStyledAsBox = props => (
    <Box as={SomeComponent} {...props} />
  );
  expectRender(() => <SomeComponentStyledAsBox someProp="1" height={2} />);
  expect(SomeComponent).toHaveBeenCalledTimes(1);
  expect(SomeComponent.mock.calls[0][0]).toEqual({
    className: 'a b c d',
    someProp: '1',
  });
});

test('margin shorthand', () => {
  expectRender(() => <Box margin={1} />);
});

test('marginHorizontal shorthand', () => {
  expectRender(() => <Box marginHorizontal={1} />);
});

test('marginVertical shorthand', () => {
  expectRender(() => <Box marginVertical={1} />);
});

test('marginBottom', () => {
  expectRender(() => <Box marginBottom={1} />);
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

test('padding shorthand', () => {
  // Just one test, because the implementation is the same as for margin.
  expectRender(() => <Box padding={1} />);
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
    expectRender(() => <Box {...{ [prop]: 'foo' }} />);
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
    expectRender(() => <Box {...{ [prop]: 1 }} />);
  });
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

// https://github.com/necolas/react-native-web expandStyle-test.js
test('flex shorthand', () => {
  expectRender(() => <Box flex={1} />);
  expectRender(() => <Box flex={1} flexShrink={2} />);
  expectRender(() => <Box flex={1} flexShrink={2} flexBasis="3px" />);
  expectRender(() => <Box flex={3} flexShrink={2} flexBasis="1px" />);
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
