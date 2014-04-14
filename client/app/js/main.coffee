goog.provide 'app.main'

goog.require 'app.DiContainer'

###*
  @param {Object} data Server side data. Useful for config, preload, whatever.
###
app.main = (data) ->
  container = new app.DiContainer

  container.configure
    resolve: App
    with:
      # Inject runtime value.
      element: document.querySelector '#este-app'

  # Check app.coffee to see what happen there.
  container.resolveApp()

goog.exportSymbol 'app.main', app.main