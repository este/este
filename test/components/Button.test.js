// @flow
import React from 'react';
import Button from '../../components/Button';
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
  button: {
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 0.25,
    marginVertical: 0.3,
    paddingVertical: 0.2,
    disabledOpacity: 0.5,
  },
};

const expectRender = createExpectRender(theme);

const onPress = () => {};

test('render', () => {
  expectRender(() => <Button onPress={onPress} />);
});

test('primary', () => {
  expectRender(() => <Button primary onPress={onPress} />);
});

test('primary outline', () => {
  expectRender(() => <Button primary outline onPress={onPress} />);
});

test('disabled', () => {
  expectRender(() => <Button disabled onPress={onPress} />);
});
