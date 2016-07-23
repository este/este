import * as actions from './actions';
import { Record } from '../transit';

const InitialState = Record({
  currentLocale: null,
  defaultLocale: null,
  initialNow: null,
  locales: null,
  messages: null,
}, 'intl');

export default function intlReducer(state = new InitialState, action) {
  switch (action.type) {

    case actions.SET_CURRENT_LOCALE: {
      const { locale } = action.payload;
      return state.set('currentLocale', locale);
    }

  }

  return state;
}
