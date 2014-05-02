goog.provide 'server.main'

goog.require 'server.DiContainer'

###*
  @param {Object} config
###
server.main = (config) ->

  container = new server.DiContainer

  # Note how CommonJS modules are injected. Requiring from different place
  # than composite root is an anti-pattern leading towards hard to test code.
  container.configure
    resolve: server.App
    with:
      isDev: config['env']['development']
      port: config['server']['port']
      express: require 'express'
  ,
    resolve: server.FrontPage
    with:
      isDev: config['env']['development']
      # Example for CircleCI: process.env['CIRCLE_BUILD_NUM']
      buildNumber: 0
      # Data which will be passed into app.main method.
      clientData: {}
  ,
    resolve: server.Middleware
    with:
      compression: require 'compression'
      favicon: require 'static-favicon'
      bodyParser: require 'body-parser'
      methodOverride: require 'method-override'

  container.resolveServerApp()

goog.exportSymbol 'server.main', server.main