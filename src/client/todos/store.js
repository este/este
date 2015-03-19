import * as actions from './actions'
import {Range, Record} from 'immutable'
import {getRandomString} from '../../lib/getrandomstring'
import {newTodoCursor, todosCursor} from '../state'
import {register} from '../dispatcher'

// Isomorphic store has to be state-less.

const TodoItem = Record({
  id: '',
  title: ''
})

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
