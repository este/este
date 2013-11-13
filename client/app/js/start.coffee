###*
  @fileoverview Este app boilerplate.
###

goog.provide 'app.start'

goog.require 'este.demos.react.todoApp'

###*
  @param {Object} data Server side data.
###
app.start = (data) ->
  todoApp = este.demos.react.todoApp data['todoApp']
  parentEl = document.querySelector '#todo-mvc'
  este.react.render todoApp, parentEl

goog.exportSymbol 'app.start', app.start