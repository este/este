import {Record} from 'immutable';
import messages from '../messages';
import * as actions from './actions';
import {REVIVE_STATE} from '../app/actions';

const initialState = new (Record({
  messages: messages,
  availableLanguages: ['en', 'pl'],
  selectedLanguage: 'en',
  defaultLanguage: 'en'
}));

const revive = state => initialState.merge({
  selectedLanguage: state.selectedLanguage
});

export default function intlStore(state = initialState, action) {

  switch (action.type) {

    case actions.SELECT_LANGUAGE: {
      const {locale} = action.payload;
      return state.set('selectedLanguage', locale);
    }

    case REVIVE_STATE: {
      const {intl} = action.payload;
      return intl ? revive(intl) : state;
    }

  }

  return state;
}
