import State from '../lib/state';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const state = new State(initialState);
export const $pendingActionsCursor = state.cursor(['$pendingActions']);
export const authCursor = state.cursor(['auth']);
export const i18nCursor = state.cursor(['i18n']);
export const newTodoCursor = state.cursor(['newTodo']);
export const todosCursor = state.cursor(['todos']);
export const userCursor = state.cursor(['user']);
