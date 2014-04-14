goog.provide 'app.home.Controller'

class app.home.Controller

  ###*
    @param {app.home.react.TodoApp} todoApp
    @constructor
  ###
  constructor: (@todoApp) ->

  ###*
    @param {Element} container
  ###
  render: (container) ->
    React.renderComponent @todoApp.reactClass(), container