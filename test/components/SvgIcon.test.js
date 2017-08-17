// @flow
import React from 'react';
import SvgIcon from '../../components/SvgIcon';
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
};

const expectRender = createExpectRender(theme);

test('render', () => {
  expectRender(() => <SvgIcon svg={<svg />} />);
});

test('color and size', () => {
  expectRender(() => <SvgIcon color="primary" size={1} svg={<svg />} />);
});
