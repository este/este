import State from './lib/state';
import initialState from './initialstate';
import reviveTodos from './todos/revive';

export const appState = new State(initialState, function(key, value) {
  switch (key) {
    case 'todos': return reviveTodos(value);
  }
});

export const i18nCursor = appState.cursor(['i18n']);
export const pendingActionsCursor = appState.cursor(['pendingActions']);
export const todosCursor = appState.cursor(['todos']);
