goog.provide 'App'

class App

  ###*
    @param {app.react.App} reactApp
    @param {Element} element
    @constructor
  ###
  constructor: (reactApp, element) ->
    React.renderComponent reactApp.reactClass(), element