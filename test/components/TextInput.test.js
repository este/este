// @flow
import React from 'react';
import TextInput from '../../components/TextInput';
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
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    rawStyle: {
      fixFontSmoothing: true,
    },
  },
  textInput: {
    disabledOpacity: 0.5,
  },
  set: {
    marginBottom: 1,
    horizontalSpaceBetween: 0.5,
    verticalSpaceBetween: 1,
  },
};

const expectRender = createExpectRender(theme);

test('render', () => {
  expectRender(() => <TextInput maxLength={1} />);
});

test('disabled', () => {
  expectRender(() => <TextInput maxLength={1} disabled />);
});

test('color', () => {
  expectRender(() => <TextInput maxLength={1} color="primary" />);
});

test('label', () => {
  expectRender(() => <TextInput maxLength={1} label="label" />);
});

test('error', () => {
  expectRender(() => <TextInput maxLength={1} error="error" />);
});

// TODO: label and error as components
