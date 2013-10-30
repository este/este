###*
  @fileoverview Este app boilerplate.
###

goog.provide 'app.start'

goog.require 'este.demos.react.start'

###*
  @param {Object} config Server side generated app config.
###
app.start = (config) ->
  # console.log config['userId']
  este.demos.react.start '#todo-mvc'

goog.exportSymbol 'app.start', app.start