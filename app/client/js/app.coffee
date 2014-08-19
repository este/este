goog.provide 'App'

class App

  ###*
    @param {app.Routes} routes
    @param {app.react.App} reactApp
    @param {app.Title} appTitle
    @param {Element} element
    @constructor
  ###
  constructor: (routes, reactApp, appTitle, element) ->
    # This should be set by este.Router or any other router.
    routes.setActive routes.home, {}

    document.title = appTitle.get()
    React.renderComponent reactApp.component(), element
