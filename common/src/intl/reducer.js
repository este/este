import messages from './messages';
import {Record} from 'immutable';

const InitialState = Record({
  availableLanguages: ['en', 'pl'],
  messages,
  selectedLanguage: 'en'
});
const initialState = new InitialState;

export default function intlReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  return state;

}
