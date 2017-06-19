// @flow
import type { State, Dispatch } from '../types';
import Button from './button';
import { connect } from 'react-redux';

// Test vertical rhythm visually. Inspired by basehold.it

type ToggleBaselineProps = {
  baselineShown: *,
  dispatch: Dispatch,
};

const ToggleBaseline = ({ baselineShown, dispatch }: ToggleBaselineProps) =>
  <Button
    primary
    outline
    size={-1}
    onPress={() => dispatch({ type: 'TOGGLE_BASELINE' })}
  >
    {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
  </Button>;

export default connect((state: State) => ({
  baselineShown: state.app.baselineShown,
}))(ToggleBaseline);
