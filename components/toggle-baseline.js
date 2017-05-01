// @flow
import type { State } from '../types';
import Button from './button';
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
  <Button
    key={baselineShown} // To enforce blur after click.
    onPress={toggleBaseline}
    outline
    primary
    size={-1}
  >
    {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
  </Button>
);

export default connect(
  (state: State) => ({
    baselineShown: state.app.baselineShown,
  }),
  { toggleBaseline }
)(ToggleBaseline);
