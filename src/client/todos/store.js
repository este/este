import * as actions from './actions'
import {Range, List, fromJS, Map, Record} from 'immutable'
import {getRandomString} from '../../lib/getrandomstring'
import state from '../../lib/state'
import {register} from '../dispatcher'

// Isomorphic store has to be state-less.

class TodoItem extends Record({
  id: '',
  title: ''
}) {
  toString() {
    return 'todo'
  }
}

class Todos extends Record({
  newTodo: new TodoItem().toMap(),
  todos: List([
    new TodoItem({id: 1, title: 'consider ‘stop doing’ app'}),
    new TodoItem({id: 2, title: 'relax'})
  ])
}) {
  fromJS(json) {
    return new Todos(fromJS(json))
      .update('todos', todos => todos.map(json => new TodoItem(json)))
  }
  toString() {
    return 'todos'
  }
}

const cursor = state.register(Todos)

  console.log(cursor().todos)
export const dispatchToken = register(({action, data}) => {

  let todo

  switch (action) {
    case actions.onNewTodoFieldChange:
      // Always use destructing vars. It's explicit.
      const {name, value} = data
      cursor(todos => todos
        .update('newTodo', todo => todo.set(name, value)))
      break

    case actions.addTodo:
      todo = data
      cursor(todos => todos
        .update('todos', todos => todos.push(new TodoItem({
          id: getRandomString(),
          title: todo.get('title')
        })))
        .set('newTodo', new TodoItem().toMap()))
      break

    case actions.deleteTodo:
      todo = data
      cursor(todos => todos.
        update('todos', todos => todos.delete(todos.indexOf(todo))))
      break

    case actions.clearAll:
      cursor(todos => todos.
        update('todos', todos => todos.clear()))
      break

    case actions.addHundredTodos:
      cursor(todos => todos
        .update('todos', todos => todos.concat(Range(0, 100)
          .map(i => getRandomString())
          .map(id => new TodoItem({id, title: `Item #${id}`})))))
      break
  }

})

export function getNewTodo() {
  return cursor().newTodo
}

export function getTodos() {
  return cursor().todos
}
