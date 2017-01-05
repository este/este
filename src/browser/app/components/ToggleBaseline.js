// @flow
import type { State } from '../../../common/types';
import Box from './Box';
import Button from './Button';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { toggleBaseline } from '../../../common/app/actions';

type ToggleBaselineProps = {
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
};

// Test vertical rhythm visually. Inspired by basehold.it

const ToggleBaseline = ({ baselineShown, toggleBaseline }: ToggleBaselineProps) => (
  <Box>
    <Button
      bold={false}
      border
      key={baselineShown} // To enforce blur after click.
      onClick={toggleBaseline}
    >
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </Button>
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
