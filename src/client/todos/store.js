import * as actions from './actions'
import {Range, Record, Map, List, fromJS} from 'immutable'
import {getRandomString} from '../../lib/getrandomstring'
import store from '../store'
import {register} from '../dispatcher'

// Isomorphic store has to be state-less.

const TodoItem = Record({
  id: '',
  title: ''
})

const newTodoCursor = store('newTodo', json => json
  ? fromJS(json)
  : Map({title: ''}))

const todosCursor = store('todos', json => json
  ? fromJS(json).map(TodoItem)
  : List([
      TodoItem({id: 1, title: 'consider ‘stop doing’ app'}),
      TodoItem({id: 2, title: 'relax'})
    ]))

export const dispatchToken = register({
  [actions.onNewTodoFieldChange]: ({name, value}) => {
    newTodoCursor(todo => todo.set(name, value))
  },
  [actions.addTodo]: ({todo}) => {
    todosCursor(todos => todos.push(new TodoItem({
      id: getRandomString(),
      title: todo.get('title')
    }).toMap()))
    newTodoCursor(todo => new TodoItem().toMap())
  },
  [actions.deleteTodo]: ({todo}) => {
    todosCursor(todos => todos.delete(todos.indexOf(todo)))
  },
  [actions.clearAll]: () => {
    todosCursor(todos => todos.clear())
  },
  [actions.addHundredTodos]: () => {
    todosCursor(todos => {
      return todos.withMutations(list => {
        Range(0, 100).forEach(i => {
          const id = getRandomString()
          list.push(new TodoItem({
            id: id,
            title: `Item #${id}`
          }).toMap())
        })
      })
    })
  }
})

export function getNewTodo() {
  return newTodoCursor()
}

export function getTodos() {
  return todosCursor()
}
