// @flow
import type { Action } from '../types';

export type AppState = {
  baselineShown: boolean,
  darkEnabled: boolean,
  name: string,
  version: string,
  locale: string,
  defaultLocale: string,
  supportedLocales: Array<string>,
};

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
  // Errors are stored per forms in their states, but also here.
  // It's useful for global errors popup alert for small devices, for example.
  // Strings are good enough here.
  if (
    action.type.endsWith('_ERROR') &&
    action.errors &&
    (action.errors.appError || action.errors.validationErrors)
  ) {
    return { ...state, errors: (action.errors: any) }; // Flow can't infer.
  } else if (action.type.endsWith('_SUCCESS')) {
    return { ...state, errors: null };
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
