import { Record } from 'immutable';

const InitialState = Record({
  locales: null,
  currentLocale: null
});
const initialState = new InitialState;

export default function intlReducer(state = initialState) {
  if (!(state instanceof InitialState)) initialState.merge(state);

  // TODO: Add SET_CURRENT_LOCALE action.

  return state;
}
