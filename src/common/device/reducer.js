import { Record } from 'immutable';

const InitialState = Record({
  isMobile: false,
  platform: '',
  host: ''
});
const initialState = new InitialState;

export default function deviceReducer(state = initialState) {
  if (!(state instanceof InitialState)) return initialState.merge(state);
  return state;
}
