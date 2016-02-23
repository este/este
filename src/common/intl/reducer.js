import messages from './messages';
import { Record } from 'immutable';

const InitialState = Record({
  availableLanguages: ['en'],
  msg: messages.en,
  selectedLanguage: 'en'
});
const initialState = new InitialState;

const revive = state => initialState
  .set('selectedLanguage', state.selectedLanguage);

export default function intlReducer(state = initialState) {
  if (!(state instanceof InitialState)) return revive(state);

  // TODO: Add SET_APP_LANGUAGE action.

  return state;
}
