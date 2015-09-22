import messages from './messages';
import {Record} from 'immutable';

const InitialState = Record({
  availableLanguages: ['en', 'pl'],
  messages,
  selectedLanguage: 'en'
});
const initialState = new InitialState;

export default function intlReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState
    .mergeDeep(state)
    // TODO: Investigate why messages are converted to map.
    .update('messages', messages => messages.toJS())

  return state;

}
