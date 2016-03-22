import { Record } from 'immutable';

const InitialState = Record({
  host: '',
  platform: '' // iOS or Android in React Native.
});
const initialState = new InitialState;

export default function deviceReducer(state = initialState) {
  if (!(state instanceof InitialState)) return new InitialState(state);
  return state;
}
