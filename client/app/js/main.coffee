###*
  @fileoverview Este app boilerplate.
###

goog.provide 'app.main'

goog.require 'este.demos.react.todoApp'

###*
  @param {Object} data Server side data.
###
app.main = (data) ->
  todoApp = este.demos.react.todoApp data['todoApp']
  parentEl = document.querySelector '#todo-mvc'
  este.react.render todoApp, parentEl

goog.exportSymbol 'app.main', app.main