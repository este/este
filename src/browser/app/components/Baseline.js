// @flow
import type { State } from '../../../common/types';
import Box from './Box';
import React from 'react';
import { compose, times } from 'ramda';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it
// We can't use original basehold.it, because it's http and browser only.

const lineStyle = (lineHeight, count) => ({
  borderTop: 'dotted 1px rgba(0, 0, 0, 0.2)',
  height: '1px',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: `${(lineHeight * count) - 1}px`,
  zIndex: 9999,
});

const Line = ({ lineHeight, count }) => (
  <Box style={lineStyle(lineHeight, count)} />
);

type BaselineProps = {|
  baselineShown: boolean,
  children: any,
  lineHeight: number,
|};

const Baseline = ({ baselineShown, children, lineHeight }: BaselineProps) => (
  <Box>
    {children}
    {baselineShown &&
      <Box>
        {times(count =>
          <Line lineHeight={lineHeight} count={count} />
        , 100)}
      </Box>
    }
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      baselineShown: state.app.baselineShown,
    }),
  ),
)(Baseline);
