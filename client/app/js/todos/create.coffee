###*
  @fileoverview Factory for app.todos.Component.
###
goog.provide 'app.todos.create'

goog.require 'app.todos.Collection'
goog.require 'app.todos.Component'

###*
  @param {string} selector
  @return {app.todos.Component}
###
app.todos.create = (selector) ->
  # Let's make todos model collection.
  todos = new app.todos.Collection
  # Inject it into todos view.
  component = new app.todos.Component todos
  # Get an element for UI component then render.
  element = document.querySelector selector
  component.render element
  # Return rendered component.
  component