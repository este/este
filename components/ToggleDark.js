// @flow
import type { State, Dispatch } from '../types';
import Button from './Button';
import React from 'react';
import { connect, type MapStateToProps } from 'react-redux';

const ToggleDark = ({ darkEnabled, dispatch }) => (
  <Button
    primary
    outline
    size={-1}
    onPress={() => (dispatch: Dispatch)({ type: 'TOGGLE_DARK' })}
  >
    {darkEnabled ? 'Disable Dark' : 'Enable dark'}
  </Button>
);

const mapStateToProps: MapStateToProps<*, *, *> = (state: State) => ({
  darkEnabled: state.app.darkEnabled,
});

export default connect(mapStateToProps)(ToggleDark);
