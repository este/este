// @flow
import type { State } from '../types';
import Button from './button';
import Buttons from './buttons';
import { connect } from 'react-redux';
import { toggleBaseline } from '../lib/app/actions';

// Test vertical rhythm visually. Inspired by basehold.it

type ToggleBaselineProps = {|
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
|};

const ToggleBaseline = ({
  baselineShown,
  toggleBaseline,
}: ToggleBaselineProps) => (
  <Buttons>
    <Button primary outline size={-1} onPress={toggleBaseline}>
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </Button>
  </Buttons>
);

export default connect(
  (state: State) => ({
    baselineShown: state.app.baselineShown,
  }),
  { toggleBaseline }
)(ToggleBaseline);
