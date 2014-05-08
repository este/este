goog.provide 'app.main'

goog.require 'app.DiContainer'

###*
  @param {Object} data Server side data. Useful for config, preload, whatever.
###
app.main = (data) ->

  # DI container is magic tool, check: github.com/steida/closure-dicontainer.
  container = new app.DiContainer

  # Inject document.body to App constructor.
  container.configure
    resolve: App
    with: element: document.body

  # Instantiate App with all their dependencies resolved.
  container.resolveApp()

goog.exportSymbol 'app.main', app.main