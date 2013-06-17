###*
  @fileoverview Collection representing list of todos models.
###
goog.provide 'app.todos.Collection'

goog.require 'app.todos.Model'
goog.require 'este.Collection'

class app.todos.Collection extends este.Collection

  ###*
    @param {Array=} array We can fulfil collection with plain array of JSONs.
    @constructor
    @extends {este.Collection}
  ###
  constructor: (array) ->
    super array

  ###*
    @override
  ###
  model: app.todos.Model