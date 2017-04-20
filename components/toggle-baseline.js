// @flow
import type { State } from '../types';
import Box from './box';
// import OutlineButton from './OutlineButton';
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
  <Box flexDirection="row">
    <button onClick={() => toggleBaseline()}>
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </button>
    {/* <OutlineButton
      size={-1}
      key={baselineShown} // To enforce blur after click.
      onPress={toggleBaseline}
    >
      {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
    </OutlineButton> */}
  </Box>
);

export default connect(
  (state: State) => ({
    baselineShown: state.app.baselineShown,
  }),
  { toggleBaseline }
)(ToggleBaseline);
