goog.provide 'server.Middleware'

class server.Middleware

  ###*
    @param {Function} compression
    @param {Function} favicon
    @param {Function} bodyParser
    @param {Function} methodOverride
    @constructor
  ###
  constructor: (@compression, @favicon, @bodyParser, @methodOverride) ->

  use: (app) ->
    app['use'] @compression()
    app['use'] @favicon 'client/app/img/favicon.ico'
    app['use'] @bodyParser()
    app['use'] @methodOverride()