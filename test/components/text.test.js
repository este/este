// @flow
import Text from '../../components/text';
import { createExpectRender } from './utils';

const theme = {
  typography: {
    fontSize: level => level * 2 + 16, // 0 = 16, 1 = 18, -1 = 14 etc.
    rhythm: ratio => ratio * 24,
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
  text: {
    bold: 600,
    color: 'black',
    // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    rawStyle: {
      fixFontSmoothing: true,
    },
  },
};

const expectRender = createExpectRender(theme);

test('text without props', () => {
  expectRender(() => <Text />);
});

test('props', () => {
  expectRender(() => <Text align="left" />);
  expectRender(() => <Text bold />);
  expectRender(() => <Text color="primary" />);
  expectRender(() => <Text decoration="underline" />);
  expectRender(() => <Text fontFamily="arial" />);
  expectRender(() => <Text italic />);
  expectRender(() => <Text lineHeight={10} />);
  expectRender(() => <Text size={1} />);
});

test('fix fontSmoothing for light text on dark background', () => {
  expectRender(() => <Text color="primary" backgroundColor="black" />);
});

test('do not fix fontSmoothing for dark text on light background', () => {
  expectRender(() => <Text color="primary" backgroundColor="white" />);
});

test('do not fix fontSmoothing for dark text without backgroundColor', () => {
  expectRender(() => <Text color="primary" />);
});

test('lineHeight ensures vertical rhythm', () => {
  expectRender(() => <Text size={4} />);
  expectRender(() => <Text size={5} />);
  expectRender(() => <Text size={16} />);
  expectRender(() => <Text size={17} />);
});

describe('ReactNative', () => {
  test('text without props', () => {
    expectRender(() => <Text isReactNative />);
  });

  test('do not fix fontSmoothing for light text on dark background', () => {
    expectRender(() => (
      <Text color="primary" backgroundColor="black" isReactNative />
    ));
  });
});
