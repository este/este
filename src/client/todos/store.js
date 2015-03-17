import * as actions from './actions'
import {Range, Record, Map, List, fromJS} from 'immutable'
import {getRandomString} from '../../lib/getrandomstring'
import {store} from '../state'
import {register} from '../dispatcher'

// Isomorphic store has to be state-less.

const TodoItem = Record({
  id: '',
  title: ''
})

const newTodoCursor = store({
  name: 'newTodo',
  create: () => TodoItem().toMap(),
})

const todosCursor = store({
  name: 'todos',
  create: () => List([
    TodoItem({id: 1, title: 'consider ‘stop doing’ app'}),
    TodoItem({id: 2, title: 'relax'})
  ]),
  load: json => fromJS(json).map(TodoItem)
})

export const dispatchToken = register({
  [actions.onNewTodoFieldChange]: ({name, value}) => {
    newTodoCursor(todo => todo.set(name, value))
  },
  [actions.addTodo]: ({todo}) => {
    todosCursor(todos => todos.push(TodoItem({
      id: getRandomString(),
      title: todo.get('title')
    })))
    newTodoCursor(todo => TodoItem().toMap())
  },
  [actions.deleteTodo]: ({todo}) => {
    todosCursor(todos => todos.delete(todos.indexOf(todo)))
  },
  [actions.clearAll]: () => {
    todosCursor(todos => todos.clear())
  },
  [actions.addHundredTodos]: () => {
    todosCursor(todos =>
      todos.concat(Range(0, 100)
        .map(i => getRandomString())
        .map(id => TodoItem({
          id: id,
          title: `Item #${id}`
        }))))
  }
})

export function getNewTodo() {
  return newTodoCursor()
}

export function getTodos() {
  return todosCursor()
}
