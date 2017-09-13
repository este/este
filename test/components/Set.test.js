// @flow
import React from 'react';
import Box from '../../components/Box';
import Set from '../../components/Set';
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
  set: {
    marginBottom: 1,
    horizontalSpaceBetween: 0.5,
    verticalSpaceBetween: 1,
  },
};

const expectRender = createExpectRender(theme);

const onChange = () => {};

test('empty set has default marginBottom 1', () => {
  expectRender(() => <Set />);
});

test('set with one item', () => {
  expectRender(() => <Set>a</Set>);
});

test('set with two items', () => {
  expectRender(() => (
    <Set>
      <Box>a</Box>
      <Box>b</Box>
    </Set>
  ));
});

test('set with two items and custom spaceBetween', () => {
  expectRender(() => (
    <Set spaceBetween={2}>
      <Box>a</Box>
      <Box>b</Box>
    </Set>
  ));
});

test('vertical set with one item', () => {
  expectRender(() => <Set vertical>a</Set>);
});

test('vertical set with two items', () => {
  expectRender(() => (
    <Set vertical>
      <Box>a</Box>
      <Box>b</Box>
    </Set>
  ));
});

test('vertical set with two items and custom spaceBetween', () => {
  expectRender(() => (
    <Set vertical spaceBetween={2}>
      <Box>a</Box>
      <Box>b</Box>
    </Set>
  ));
});
