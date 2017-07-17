// @flow
import type { State, Dispatch } from '../types';
import Button from './Button';
import { connect } from 'react-redux';

// Toggle dark mode.

type ToggleDarkProps = {
  darkEnabled: *,
  dispatch: Dispatch,
};

const ToggleDark = ({ darkEnabled, dispatch }: ToggleDarkProps) =>
  <Button
    primary
    outline
    size={-1}
    onPress={() => dispatch({ type: 'TOGGLE_DARK' })}
  >
    {darkEnabled ? 'Disable Dark' : 'Enable dark'}
  </Button>;

export default connect((state: State) => ({
  darkEnabled: state.app.darkEnabled,
}))(ToggleDark);
