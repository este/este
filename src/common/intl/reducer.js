import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  // Defined in src/server/frontend/createInitialState.js
  currentLocale: null,
  defaultLocale: null,
  initialNow: null,
  locales: null,
  messages: {}
});

export default function intlReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case actions.SET_CURRENT_LOCALE: {
      const { locale } = action.payload;
      return state.set('currentLocale', locale);
    }

  }

  return state;
}
