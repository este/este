// @flow
import type { State } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type BaselineProps = {|
  baselineShown: boolean,
  children: any,
  lineHeight: number,
|};

const styles = {
  container: {
    position: 'relative',
  },
  baseline: lineHeight => ({
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
    backgroundSize: `auto ${lineHeight}px`,
    bottom: 0,
    left: 0,
    marginTop: '-1px',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9999,
  }),
};

const Baseline = ({ baselineShown, children, lineHeight }: BaselineProps) => (
  <div style={styles.container}>
    {children}
    {baselineShown &&
      <div style={styles.baseline(lineHeight)} />
    }
  </div>
);

export default compose(
  connect(
    (state: State) => ({
      baselineShown: state.app.baselineShown,
    }),
  ),
)(Baseline);
