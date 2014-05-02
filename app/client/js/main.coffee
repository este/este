goog.provide 'app.main'

goog.require 'app.DiContainer'

###*
  @param {Object} data Server side data. Useful for config, preload, whatever.
###
app.main = (data) ->
  container = new app.DiContainer

  container.configure
    resolve: App
    with: element: document.body

  # Check 'app.coffee' file to see what happens there.
  container.resolveApp()

goog.exportSymbol 'app.main', app.main