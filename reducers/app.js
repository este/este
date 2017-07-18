// @flow
import type { Action, AppState } from '../types';

// This is defined by server in app.js
const initialState = {
  baselineShown: false,
  darkEnabled: false,
  errors: null,
  name: '',
  version: '',
  locale: 'en',
  defaultLocale: 'en',
  supportedLocales: ['en'],
};

// flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
const reducer = (state: AppState = initialState, action: Action): AppState => {
  // Errors are stored per forms in their states, but also here.
  // It's useful for global errors popup alert for small devices, for example.
  if (
    action.errors &&
    action.errors.appError &&
    action.errors.validationErrors
  ) {
    // $FlowFixMe Use type refinement or type casting.
    return { ...state, errors: action.errors };
  }

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
