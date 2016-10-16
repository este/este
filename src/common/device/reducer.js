/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const InitialState = Record({
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
  device: 'mobile',
}, 'device');

const initialState = new InitialState();

export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case actions.SET_DEVICE: {
      return state.set('device', action.payload);
    }
  }

  return state;
}
