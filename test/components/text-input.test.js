// @flow
import TextInput from '../../components/text-input';
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
  textInput: {
    disabledOpacity: 0.5,
  },
};

const expectRender = createExpectRender(theme);

const onChange = () => {};

test('render', () => {
  expectRender(() => <TextInput onChange={onChange} />);
});

test('disabled', () => {
  expectRender(() => <TextInput onChange={onChange} disabled />);
});

test('color', () => {
  expectRender(() => <TextInput onChange={onChange} color="primary" />);
});

test('label', () => {
  expectRender(() => <TextInput onChange={onChange} label="label" />);
});

test('error', () => {
  expectRender(() => <TextInput onChange={onChange} error="error" />);
});
