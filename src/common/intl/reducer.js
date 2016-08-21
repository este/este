/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  currentLocale: null,
  defaultLocale: null,
  initialNow: null,
  locales: null,
  messages: null,
}, 'intl');

const intlReducer = (state = new State(), action) => {
  switch (action.type) {

    case actions.SET_CURRENT_LOCALE: {
      const { locale } = action.payload;
      return state.set('currentLocale', locale);
    }

    default:
      return state;

  }
};

export default intlReducer;
