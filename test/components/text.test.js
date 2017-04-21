// @flow
import { computeStyle } from '../../components/text';

const browserDefaultStyle = {
  // Enforce React Native behaviour for browsers.
  // display: 'flex',
  // flexDirection: 'column',
  // position: 'relative',
  // overflow: 'hidden',
};

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

// $ FlowFixMe Don't fix. We test real values, not types.
const compute = props => computeStyle(props, { isReactNative: true })(theme);

// $ FlowFixMe Don't fix. We test real values, not types.
const computeBrowser = props =>
  computeStyle(props, { isReactNative: false })(theme);

test('text without props', () => {
  const boxProps = compute({});
  expect(boxProps).toMatchSnapshot();
});

test('browser text without props', () => {
  const boxProps = computeBrowser({});
  expect(boxProps).toMatchSnapshot();
});

test('props', () => {
  expect(compute({ align: 'left' })).toMatchSnapshot();
  expect(compute({ bold: true })).toMatchSnapshot();
  expect(compute({ color: 'primary' })).toMatchSnapshot();
  expect(compute({ decoration: 'underline' })).toMatchSnapshot();
  expect(compute({ fontFamily: 'arial' })).toMatchSnapshot();
  expect(compute({ italic: true })).toMatchSnapshot();
  expect(compute({ lineHeight: 10 })).toMatchSnapshot();
  expect(compute({ size: 1 })).toMatchSnapshot();
});

test('fix fontSmoothing for light text on a dark background', () => {
  expect(
    computeBrowser({ color: 'primary', backgroundColor: 'black' })
  ).toMatchSnapshot();
});

test('do not fix fontSmoothing for dark text on a light background', () => {
  expect(
    computeBrowser({ color: 'primary', backgroundColor: 'white' })
  ).toMatchSnapshot();
});

test('do not fix fontSmoothing for dark text without backgroundColor', () => {
  expect(computeBrowser({ color: 'primary' })).toMatchSnapshot();
});

test('lineHeight ensures vertical rhythm', () => {
  // $FlowFixMe
  expect(compute({ size: 4 }).rawStyle.lineHeight).toBe(
    theme.typography.lineHeight * 1
  );
  // $FlowFixMe
  expect(compute({ size: 5 }).rawStyle.lineHeight).toBe(
    theme.typography.lineHeight * 2
  );
  // $FlowFixMe
  expect(compute({ size: 16 }).rawStyle.lineHeight).toBe(
    theme.typography.lineHeight * 2
  );
  // $FlowFixMe
  expect(compute({ size: 17 }).rawStyle.lineHeight).toBe(
    theme.typography.lineHeight * 3
  );
});
