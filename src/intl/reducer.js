import {Record} from 'immutable';
import messages from '../messages';
import * as actions from './actions';

const initialState = new (Record({
  messages: messages,
  selectedLanguage: 'en',
  defaultLanguage: 'en'
}));

export default function intlStore(state = initialState, action) {

  switch (action.type) {

    case actions.SELECT_LANGUAGE: {
      const {locale} = action.payload;
      return state.set('selectedLanguage', locale);
    }

  }

  return state;
}
