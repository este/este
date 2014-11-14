goog.provide 'app.todos.Store'

goog.require 'app.todos.Todo'
goog.require 'este.Store'
goog.require 'goog.array'

class app.todos.Store extends este.Store

  ###*
    @param {este.Dispatcher} dispatcher
    @constructor
    @extends {este.Store}
  ###
  constructor: (dispatcher) ->
    super()
    @todos = []

    dispatcher.register (action, payload) =>
      switch action
        when app.Actions.COMPLETE_TODO then @completeTodo_ payload
        when app.Actions.ADD_TODO then @addTodo_ payload
        when app.Actions.CLEAR_TODOS then @clearTodos_()

  ###*
    @type {Array.<app.todos.Todo>}
  ###
  todos: null

  ###*
    @param {app.todos.Todo} todo
  ###
  completeTodo_: (todo) ->
    goog.array.remove @todos, todo
    @notify()

  ###*
    @param {app.todos.Todo} todo
  ###
  addTodo_: (todo) ->
    @todos.push todo
    @notify()

  clearTodos_: ->
    @todos.length = 0
    @notify()
