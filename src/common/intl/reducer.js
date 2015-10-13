import messages from './messages';
import {Record} from 'immutable';

const InitialState = Record({
  availableLanguages: ['en', 'pl'],
  messages,
  selectedLanguage: 'en'
});
const initialState = new InitialState;

const revive = state => initialState
  .mergeDeep(state)
  .update('messages', messages => messages.toJS());

export default function intlReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  return state;
}
