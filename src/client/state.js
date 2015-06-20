import State from './lib/state';
import reviveAuth from './auth/revive';
import reviveTodos from './todos/revive';
import reviveUsers from './users/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const appState = new State(initialState, function(key, value) {
  switch (key) {
    case 'auth': return reviveAuth(value);
    case 'todos': return reviveTodos(value);
    case 'users': return reviveUsers(value);
  }
});

export const authCursor = appState.cursor(['auth']);
export const examplesCursor = appState.cursor(['examples']);
export const i18nCursor = appState.cursor(['i18n']);
export const pendingActionsCursor = appState.cursor(['pendingActions']);
export const todosCursor = appState.cursor(['todos']);
export const usersCursor = appState.cursor(['users']);
