goog.provide 'app.Actions'

class app.Actions

  ###*
    @param {este.Dispatcher} dispatcher
    @constructor
  ###
  constructor: (@dispatcher) ->

  @COMPLETE_TODO: 'complete-todo'
  @ADD_TODO: 'add-todo'
  @CLEAR_TODOS: 'clear-todos'

  ###*
    @param {app.todos.Todo} todo
  ###
  completeTodo: (todo) ->
    @dispatcher.dispatch Actions.COMPLETE_TODO, todo

  ###*
    @param {app.todos.Todo} todo
  ###
  addTodo: (todo) ->
    @dispatcher.dispatch Actions.ADD_TODO, todo

  clearTodos: ->
    @dispatcher.dispatch Actions.CLEAR_TODOS
