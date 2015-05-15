import State from '../lib/state';
import TodoItem from './todos/todoitem';
import immutable from 'immutable';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

// Custom revirer example, check how to convert JSON to custom record types.
// http://facebook.github.io/immutable-js/docs/#/fromJS
export const state = new State(initialState, function(key, value) {
  // For the top level only.
  if (this === initialState)
    switch (key) {
      case 'newTodo':
        return new TodoItem(value.toJS());
      case 'todos':
        return value.map(todo => new TodoItem(todo.toJS())).toList();
    }

  return immutable.Iterable.isIndexed(value)
    ? value.toList()
    : value.toMap();
});

export const authCursor = state.cursor(['auth']);
export const i18nCursor = state.cursor(['i18n']);
export const newTodoCursor = state.cursor(['newTodo']);
export const pendingActionsCursor = state.cursor(['pendingActions']);
export const todosCursor = state.cursor(['todos']);
export const userCursor = state.cursor(['user']);
