/* @flow weak */
import * as actions from './actions';

const initialState = {
  currentLocale: null,
  defaultLocale: null,
  initialNow: null,
  locales: null,
  messages: null,
};

const intlReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.SET_CURRENT_LOCALE: {
      return { ...state, currentLocale: action.payload.locale };
    }

    default:
      return state;

  }
};

export default intlReducer;
