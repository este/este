import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  currentLocale: null, // Autodetected in /server/frontend/render.js
  initialNow: null, // Set in /server/frontend/render.js
  locales: null, // Defined in /server/config.js
  messages: {} // Created from /messages files.
});
const initialState = new InitialState;

export default function intlReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case actions.SET_CURRENT_LOCALE: {
      const { locale } = action.payload;
      return state.set('currentLocale', locale);
    }

  }

  return state;
}
