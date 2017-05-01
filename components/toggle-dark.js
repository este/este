// @flow
import type { State } from '../types';
import Button from './button';
import { connect } from 'react-redux';
import { toggleDark } from '../lib/app/actions';

type ToggleDarkProps = {|
  darkEnabled: boolean,
  toggleDark: typeof toggleDark,
|};

const ToggleDark = ({ darkEnabled, toggleDark }: ToggleDarkProps) => (
  <Button
    key={darkEnabled} // To enforce blur after click.
    onPress={toggleDark}
    outline
    primary
    size={-1}
  >
    {darkEnabled ? 'Disable Dark' : 'Enable dark'}
  </Button>
);

export default connect(
  (state: State) => ({
    darkEnabled: state.app.darkEnabled,
  }),
  { toggleDark }
)(ToggleDark);
