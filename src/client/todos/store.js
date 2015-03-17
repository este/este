import * as actions from './actions'
import {Range, Record} from 'immutable'
import {TodoRecord} from './model'
import {getRandomString} from '../../lib/getrandomstring'
import {newTodoCursor, todosCursor} from '../state'
import {register} from '../dispatcher'

// Isomorphic store has to be state-less.

export const dispatchToken = register({
  [actions.onNewTodoFieldChange]: ({name, value}) => {
    newTodoCursor(todo => todo.set(name, value))
  },
  [actions.addTodo]: ({todo}) => {
    todosCursor(todos => todos.push(new TodoRecord({
      id: getRandomString(),
      title: todo.get('title')
    }).toMap()))
    newTodoCursor(todo => new TodoRecord().toMap())
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
          list.push(new TodoRecord({
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
