// @flow
import type { State } from '../../common/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { compose, range } from 'ramda';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type BaselineProps = {|
  baselineShown: boolean,
  lineHeight: number,
|};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const Baseline = ({ baselineShown, lineHeight }: BaselineProps) => {
  if (!baselineShown) return null;
  return (
    <View pointerEvents="none" style={styles.container}>
      {range(0, 100).map(i => (
        <View
          key={i}
          pointerEvents="none"
          style={[styles.line, { top: (i * lineHeight) - 1 }]}
        />
      ))}
    </View>
  );
};

export default compose(
  connect((state: State) => ({
    baselineShown: state.app.baselineShown,
  })),
)(Baseline);
