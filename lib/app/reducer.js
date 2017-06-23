// @flow
import type { Action, AppState } from '../../types';

// This is defined by server in app.js
const initialState = {
  baselineShown: false,
  darkEnabled: false,
  name: '',
  version: '',
  locale: 'en',
  defaultLocale: 'en',
  supportedLocales: ['en'],
};

// flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'TOGGLE_BASELINE':
      return { ...state, baselineShown: !state.baselineShown };
    case 'TOGGLE_DARK':
      return { ...state, darkEnabled: !state.darkEnabled };
    default:
      return state;
  }
};

export default reducer;
