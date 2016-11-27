/* @flow */
import type { Action, ThemeState } from '../types';

const initialState = {
  currentTheme: null,
};

const reducer = (
  state: ThemeState = initialState,
  action: Action,
): ThemeState => {
  switch (action.type) {

    case 'SET_THEME': {
      return { ...state, currentTheme: action.payload.theme };
    }

    default:
      return state;

  }
};

export default reducer;
