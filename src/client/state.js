import State from './lib/state';
import reviveAuth from './auth/revive';
import reviveTodos from './todos/revive';
import reviveUser from './user/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

// Custom reviver example, check how to convert JSON to custom record types.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export const state = new State(initialState, function(key, value) {
  switch (key) {
    case 'auth': return reviveAuth(value);
    case 'todos': return reviveTodos(value);
    case 'user': return reviveUser(value);
  }
});

export const appCursor = state.cursor(['app']);
export const authCursor = state.cursor(['auth']);
export const i18nCursor = state.cursor(['i18n']);
export const pendingActionsCursor = state.cursor(['pendingActions']);
export const todosCursor = state.cursor(['todos']);
export const userCursor = state.cursor(['user']);
