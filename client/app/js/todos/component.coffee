###*
  @fileoverview app.todos.Component.
###
goog.provide 'app.todos.Component'

goog.require 'app.todos.templates'
goog.require 'este.ui.Component'

class app.todos.Component extends este.ui.Component

  ###*
    @param {app.todos.Collection} todos
    @constructor
    @extends {este.ui.Component}
  ###
  constructor: (@todos) ->
    super()

  ###*
    @type {app.todos.Collection}
    @protected
  ###
  todos: null

  ###*
    @override
  ###
  enterDocument: ->
    super()
    @update()
    return

  ###*
    @override
  ###
  registerEvents: ->
    @on '.new-todo', 'submit', @onNewTodoSubmit
    @on @todos, 'update', @update

  ###*
    @param {este.events.SubmitEvent} e
    @protected
  ###
  onNewTodoSubmit: (e) ->
    todo = new app.todos.Model e.json
    errors = todo.validate()
    if errors
      alert errors[0].getMsg()
      return
    @todos.add todo

  ###*
    @protected
  ###
  update: ->
    html = app.todos.templates.element
      todos: @todos.toJson()
    # Use este.dom.merge if you want to preserve dom state.
    @getElement().innerHTML = html