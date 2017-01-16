// @flow
import type { State } from '../types';
import Box from './Box';
import Button from './Button';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { toggleBaseline } from '../app/actions';

// Test vertical rhythm visually. Inspired by basehold.it

type ToggleBaselineProps = {
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
};


const ToggleBaseline = ({
  baselineShown,
  toggleBaseline,
}: ToggleBaselineProps) => (
  <Box
    flexDirection="row"
    justifyContent="center"
  >
    <Button
      key={baselineShown} // To enforce blur after click.
      onPress={toggleBaseline}
      preset="outline"
      title={baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    />
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
