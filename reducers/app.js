// @flow
import type { Action } from '../types';

// Can't be exact type yet. Flow will fix it soon.
export type AppState = {
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +defaultLocale: string,
  +locale: string,
  +name: string,
  +supportedLocales: Array<string>,
  +version: string,
};

// This is defined by server in app.js
const initialState = {
  baselineShown: false,
  darkEnabled: false,
  defaultLocale: 'en',
  locale: 'en',
  name: '',
  supportedLocales: ['en'],
  version: '',
};

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
