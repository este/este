/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = ({ inverse, style, ...props }: any) => {
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
