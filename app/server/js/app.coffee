goog.provide 'server.App'

goog.require 'goog.labs.userAgent.util'

class server.App

  ###*
    @param {Function} bodyParser
    @param {Function} compression
    @param {Function} express
    @param {Function} favicon
    @param {Function} methodOverride
    @param {app.Routes} routes
    @param {boolean} isDev
    @param {number} port
    @param {server.FrontPage} frontPage
    @param {server.routes.Store} routesStore
    @constructor
  ###
  constructor: (bodyParser, compression, express, favicon, methodOverride,
      routes, isDev, port, frontPage, routesStore) ->

    app = express()

    # Middleware first.
    app['use'] compression()
    # app['use'] favicon 'app/client/img/favicon.ico'
    app['use'] bodyParser['json']()
    app['use'] methodOverride()

    # Static assets.
    if isDev
      app['use'] '/bower_components', express['static'] 'bower_components'
      app['use'] '/app', express['static'] 'app'
      app['use'] '/tmp', express['static'] 'tmp'
    else
      # Compiled script has per deploy specific url so set maxAge to one year.
      # TODO: Use CDN.
      app['use'] '/app', express['static'] 'app', 'maxAge': 31557600000

    # Routes.
    routes.addToExpress app, (route, req, res) ->
      params = req['params']

      routesStore.load route, params
        .then -> routes.setActive route, params
        .thenCatch (reason) -> routes.trySetErrorRoute reason
        .then ->
          # User-agent detection on server for isomorphic responsive web design.
          goog.labs.userAgent.util.setUserAgent req['headers']['user-agent']
          frontPage.render()
        .then (html) -> res['send'] html
        .thenCatch (reason) ->
          # The stack property contains the message as well as the stack.
          console.log reason.stack
          # TODO: Show something more beautiful, with static content only.
          res['status'](500)['send'] 'Something is wrong, please reload browser.'

    app['listen'] port, ->
      console.log 'Express server listening on port ' + port
