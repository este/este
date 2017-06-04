// @flow
import type { State } from '../types';
import Button from './button';
import { connect } from 'react-redux';
import { toggleDark } from '../lib/app/actions';

const ToggleDark = ({ darkEnabled, toggleDark }) =>
  <Button primary outline size={-1} onPress={toggleDark}>
    {darkEnabled ? 'Disable Dark' : 'Enable dark'}
  </Button>;

export default connect(
  (state: State) => ({ darkEnabled: state.app.darkEnabled }),
  { toggleDark }
)(ToggleDark);
