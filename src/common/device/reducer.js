import { Record } from 'immutable';

const InitialState = Record({
  host: '',
  platform: '' // iOS or Android in React Native.
});

export default function deviceReducer(state = new InitialState) {
  if (!(state instanceof InitialState)) return new InitialState(state);
  return state;
}
