// @flow
import type { State, Dispatch } from '../types';
import Button from './button';
import { connect } from 'react-redux';

// Toggle dark mode.

const ToggleDark = ({ darkEnabled, dispatch }) =>
  <Button
    primary
    outline
    size={-1}
    onPress={() => (dispatch: Dispatch)({ type: 'TOGGLE_DARK' })}
  >
    {darkEnabled ? 'Disable Dark' : 'Enable dark'}
  </Button>;

export default connect((state: State) => ({
  darkEnabled: state.config.darkEnabled,
}))(ToggleDark);
