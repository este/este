/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  inverse?: boolean,
  style?: Object,
};

const Container = ({ inverse, style, ...props }: Props) => {
  const backgroundColor = inverse
    ? theme.inverseBackgroundColor
    : theme.backgroundColor;
  return (
    <View
      {...props}
      style={[styles.container, { backgroundColor }, style]}
    />
  );
};

export default Container;
