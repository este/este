// @flow
import React from 'react';
import type { State, Dispatch } from '../types';
import Button from './Button';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

const ToggleBaseline = ({ baselineShown, dispatch }) => (
  <Button
    primary
    outline
    size={-1}
    onPress={() => (dispatch: Dispatch)({ type: 'TOGGLE_BASELINE' })}
  >
    {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
  </Button>
);

export default connect((state: State) => ({
  baselineShown: state.app.baselineShown,
}))(ToggleBaseline);
