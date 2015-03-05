import State from '../lib/state'

// State is defined in src/server/render.js loadData method.
export const state = new State
export const i18nCursor = state.cursor(['i18n'])
export const newTodoCursor = state.cursor(['newTodo'])
export const todosCursor = state.cursor(['todos'])
export const userCursor = state.cursor(['user'])
