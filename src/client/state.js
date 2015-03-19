import State from '../lib/state'
import messages from './messages'

const initialLocale = 'en'
const initialState = process.env.IS_BROWSER
  ? window._appState
  : {
    i18n: {
      formats: {},
      locales: initialLocale,
      messages: messages[initialLocale]
    },
    newTodo: { title: '' },
    todos: [
      {id: 1, title: 'consider ‘stop doing’ app'},
      {id: 2, title: 'relax'}
    ],
    user: {}
  }

export const state = new State(initialState)
export const i18nCursor = state.cursor(['i18n'])
export const newTodoCursor = state.cursor(['newTodo'])
export const todosCursor = state.cursor(['todos'])
export const userCursor = state.cursor(['user'])
