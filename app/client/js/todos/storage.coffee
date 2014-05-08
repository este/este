goog.provide 'app.todos.Storage'

goog.require 'goog.array'
goog.require 'goog.events.EventTarget'

class app.todos.Storage extends goog.events.EventTarget

  ###*
    Storage handles all operations with todo models.
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
    @dispatchChangeEvent()

  clearAll: ->
    @todos.clearAll()
    @dispatchChangeEvent()

  ###*
    @param {app.todos.Todo} todo
  ###
  remove: (todo) ->
    goog.array.remove @todos.items, todo
    @dispatchChangeEvent()

  ###*
    @private
  ###
  dispatchChangeEvent: ->
    @dispatchEvent 'change'