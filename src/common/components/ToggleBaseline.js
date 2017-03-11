// @flow
import type { State } from '../types';
import Box from './Box';
import OutlineButton from './OutlineButton';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { toggleBaseline } from '../app/actions';

// Test vertical rhythm visually. Inspired by basehold.it

type ToggleBaselineProps = {
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
};

const ToggleBaseline = (
  {
    baselineShown,
    toggleBaseline,
  }: ToggleBaselineProps,
) => (
  <Box flexDirection="row">
    <OutlineButton
      size={-1}
      key={baselineShown} // To enforce blur after click.
      onPress={toggleBaseline}
    >
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </OutlineButton>
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      baselineShown: state.app.baselineShown,
    }),
    { toggleBaseline },
  ),
)(ToggleBaseline);
