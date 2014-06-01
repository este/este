goog.provide 'app.main'

goog.require 'app.DiContainer'

###*
  @param {Object} data Server side data. Useful for config, preload, whatever.
###
app.main = (data) ->

  # Learn something about: github.com/steida/closure-dicontainer
  container = new app.DiContainer

  # Configure runtime values.
  container.configure
    resolve: App
    with: element: document.body

  # Run app with resolved dependencies.
  container.resolveApp()

goog.exportSymbol 'app.main', app.main