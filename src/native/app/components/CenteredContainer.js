/* @flow */
import React from 'react';
import { Container } from './';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  style: Object,
};

const CenteredContainer = ({ style, ...props }: Props) => (
  <Container
    {...props}
    style={[styles.centeredContainer, style]}
  />
);

export default CenteredContainer;
