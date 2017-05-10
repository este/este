// @flow
import type { State } from '../types';
import Button from './button';
import { connect } from 'react-redux';
import { toggleBaseline } from '../lib/app/actions';

// Test vertical rhythm visually. Inspired by basehold.it

const ToggleBaseline = ({ baselineShown, toggleBaseline }) => (
  <Button primary outline size={-1} onPress={toggleBaseline}>
    {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
  </Button>
);

export default connect(
  (state: State) => ({ baselineShown: state.app.baselineShown }),
  { toggleBaseline }
)(ToggleBaseline);
