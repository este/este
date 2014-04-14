goog.provide 'server.App'

class server.App

  ###*
    @param {Function} express
    @param {server.Middleware} middleware
    @param {server.Router} router
    @param {boolean} isDev
    @param {number} port
    @constructor
  ###
  constructor: (express, middleware, router, isDev, port) ->
    app = express()

    middleware.use app
    router.use app

    if isDev
      # Square brackets syntax until we will have Express 4 externs.
      app['use'] '/bower_components', express['static'] 'bower_components'
      app['use'] '/client', express['static'] 'client'
      app['use'] '/tmp', express['static'] 'tmp'
    else
      # Compiled script has per deploy specific url so set maxAge to one year.
      app['use'] '/client', express['static'] 'client', 'maxAge': 31557600000

    app['listen'] port, ->
      console.log 'Express server listening on port ' + port