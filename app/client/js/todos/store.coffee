goog.provide 'app.todos.Store'

goog.require 'goog.array'
goog.require 'goog.events.EventTarget'

class app.todos.Store extends goog.events.EventTarget

  ###*
    @param {app.todos.Todos} todos
    @constructor
    @extends {goog.events.EventTarget}
    @final
  ###
  constructor: (@todos) ->
    super()

  ###*
    @type {app.todos.Todos}
    @private
  ###
  todos: null

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  getTodos: ->
    @todos.items

  ###*
    @param {string} title
  ###
  add: (title) ->
    @todos.add title
    @notify_()

  clearAll: ->
    @todos.clearAll()
    @notify_()

  ###*
    @param {app.todos.Todo} todo
  ###
  remove: (todo) ->
    goog.array.remove @todos.items, todo
    @notify_()

  ###*
    @private
  ###
  notify_: ->
    @dispatchEvent 'change'