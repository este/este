goog.provide 'app.todos.Store'

goog.require 'app.todos.Todo'
goog.require 'goog.array'
goog.require 'goog.events.EventTarget'

class app.todos.Store extends goog.events.EventTarget

  ###*
    @constructor
    @extends {goog.events.EventTarget}
    @final
  ###
  constructor: ->
    super()
    @todos = []

  ###*
    @type {Array.<app.todos.Todo>}
  ###
  todos: null

  ###*
    @param {string} title
  ###
  add: (title) ->
    todo = new app.todos.Todo title
    @todos.push todo
    @notify_()

  clearAll: ->
    @todos.length = 0
    @notify_()

  ###*
    @param {app.todos.Todo} todo
  ###
  remove: (todo) ->
    goog.array.remove @todos, todo
    @notify_()

  ###*
    @private
  ###
  notify_: ->
    @dispatchEvent 'change'