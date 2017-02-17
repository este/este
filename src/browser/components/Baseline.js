// @flow
import type { State } from '../../common/types';
import type { Theme } from '../../common/themes/types';
import * as themes from '../themes';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type BaselineProps = {|
  baselineShown: boolean,
  children: any,
  theme: Theme,
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

const Baseline = ({ baselineShown, children, theme }: BaselineProps) => (
  <div style={styles.container}>
    {children}
    {baselineShown &&
      <div style={styles.baseline(theme.typography.lineHeight)} />}
  </div>
);

export default compose(
  connect((state: State) => ({
    baselineShown: state.app.baselineShown,
    theme: themes[state.app.currentTheme] || themes.defaultTheme,
  })),
)(Baseline);
