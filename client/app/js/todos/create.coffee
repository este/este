###*
  @fileoverview Factory for app.todos.Component. What are the factories for?
  In factories we just assemble classes (and functions). It's all about app
  wiring. We are removing service locators, aka hard-coded dependencies, from
  classses, to have later choice about how app should be assembled.
###
goog.provide 'app.todos.create'

goog.require 'app.todos.Collection'
goog.require 'app.todos.Component'

###*
  @param {string} selector
  @return {app.todos.Component}
###
app.todos.create = (selector) ->
  # Let's make todos model collection and inject it into its view.
  todos = new app.todos.Collection
  component = new app.todos.Component todos
  # Get an element for UI component, then render component.
  element = document.querySelector selector
  component.render element
  component