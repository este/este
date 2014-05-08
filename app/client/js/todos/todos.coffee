goog.provide 'app.todos.Todos'

goog.require 'app.todos.Todo'

class app.todos.Todos

  ###*
    @constructor
  ###
  constructor: ->
    @items = []

  ###*
    @type {Array.<app.todos.Todo>}
  ###
  items: null

  ###*
    @param {string} title
  ###
  add: (title) ->
    todo = new app.todos.Todo title
    @items.push todo

  clearAll: ->
    @items.length = 0