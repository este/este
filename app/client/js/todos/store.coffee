goog.provide 'app.todos.Store'

goog.require 'app.todos.Todo'
goog.require 'goog.array'
goog.require 'goog.events.EventTarget'
goog.require 'este.labs.Store'

class app.todos.Store extends este.labs.Store

  ###*
    @constructor
    @extends {este.labs.Store}
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
    @notify()

  clearAll: ->
    @todos.length = 0
    @notify()

  ###*
    @param {app.todos.Todo} todo
  ###
  remove: (todo) ->
    goog.array.remove @todos, todo
    @notify()

  ###*
    @private
  ###
#  notify_: ->
#    @dispatchEvent 'change'