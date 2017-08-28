// @flow
import type { Node } from 'react';
import type { State } from '../types';
import type { Theme } from '../themes/types';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type BaselineProps = {|
  baselineShown: boolean,
  children?: Node,
|};

type BaselineContext = {
  theme: Theme,
};

const styles = {
  container: {
    position: 'relative',
  },
  baseline: lineHeight => ({
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
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

const Baseline = (
  { baselineShown, children }: BaselineProps,
  { theme }: BaselineContext,
) => (
  <div style={styles.container}>
    {children}
    {baselineShown && (
      <div style={styles.baseline(theme.typography.lineHeight)} />
    )}
  </div>
);

Baseline.contextTypes = {
  theme: PropTypes.object,
};

export default connect((state: State) => ({
  baselineShown: state.app.baselineShown,
}))(Baseline);
