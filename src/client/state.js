import State from '../lib/state'
import messages from './messages'
import {Map, List} from 'immutable'
import {TodoRecord} from './todos/model'
import {UserRecord} from './user/model'

const initialLocale = 'en'
const initialState = process.env.IS_BROWSER
  ? window._appState
  : Map({
    i18n: Map({
      formats: Map(),
      locales: initialLocale,
      messages: Map(messages[initialLocale])
    }),
    newTodo: TodoRecord(),
    todos: List([
      TodoRecord({id: 1, title: 'consider ‘stop doing’ app'}),
      TodoRecord({id: 2, title: 'relax'})
    ]),
    user: UserRecord()
  })

export const state          = new State(initialState) // TODO: Reviver
export const i18nCursor     = state.cursor(['i18n'])
export const newTodoCursor  = state.cursor(['newTodo'])
export const todosCursor    = state.cursor(['todos'])
export const userCursor     = state.cursor(['user'])

console.log(newTodoCursor().toJS())
