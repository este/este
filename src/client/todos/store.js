import * as actions from './actions'
import dispatcher from '../dispatcher'
import {Range, Record} from 'immutable'
import {getRandomString} from '../../lib/getrandomstring'
import {newTodoCursor, todosCursor} from '../state'

// Isomorphic store has to be state-less.

const TodoItem = Record({
  id: '',
  title: ''
})

export const dispatchToken = dispatcher.register((payload) => {
  const {action, data} = payload

  switch (action) {
    case actions.onNewTodoFieldChange:
      // Always use destructing vars. It's explicit.
      var {name, value} = data
      newTodoCursor(todo => todo.set(name, value))
      break

    case actions.addTodo:
      var todo = data
      todosCursor(todos => todos.push(new TodoItem({
        id: getRandomString(),
        title: todo.get('title')
      }).toMap()))
      newTodoCursor(todo => new TodoItem().toMap())
      break

    case actions.deleteTodo:
      var todo = data
      todosCursor(todos => todos.delete(todos.indexOf(todo)))
      break

    case actions.clearAll:
      todosCursor(todos => todos.clear())
      break

    case actions.addHundredTodos:
      todosCursor(todos => {
        return todos.withMutations(list => {
          Range(0, 100).forEach(i => {
            let id = getRandomString()
            list.push(new TodoItem({
              id: id,
              title: `Item #${id}`
            }).toMap())
          })
        })
      })
      break
  }

})

export function getNewTodo() {
  return newTodoCursor()
}

export function getTodos() {
  return todosCursor()
}
