goog.provide 'app.todos.Collection'

goog.require 'app.todos.Model'

class app.todos.Collection

  ###*
    @constructor
  ###
  constructor: ->
    @items = []

  ###*
    @type {Array.<app.todos.Model>}
  ###
  items: null

  ###*
    @param {string} text
  ###
  add: (text) ->
    todo = new app.todos.Model text
    @items.push todo

  clear: ->
    @items.length = 0