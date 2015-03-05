import dispatcher from '../dispatcher'

export const MAX_TODO_TITLE_LENGTH = 42

export function onNewTodoFieldChange({target: {name, value}}) {
  switch (name) {
    case 'title':
      value = value.slice(0, MAX_TODO_TITLE_LENGTH)
      break
  }
  dispatcher.dispatch(onNewTodoFieldChange, {name, value})
}

export function addTodo(todo) {
  let title = todo.get('title').trim()
  if (!title) return
  dispatcher.dispatch(addTodo, todo)
}

export function deleteTodo(todo) {
  dispatcher.dispatch(deleteTodo, todo)
}

export function clearAll() {
  dispatcher.dispatch(clearAll)
}

export function addHundredTodos() {
  dispatcher.dispatch(addHundredTodos)
}

// Overide actions toString for logging.
dispatcher.setToString('todos', {
  onNewTodoFieldChange, addTodo, deleteTodo, clearAll, addHundredTodos
})
