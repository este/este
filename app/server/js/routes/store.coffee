goog.provide 'server.routes.Store'

goog.require 'goog.Promise'
goog.require 'goog.net.HttpStatus'

class server.routes.Store

  ###*
    @param {app.Routes} routes
    @constructor
  ###
  constructor: (@routes) ->

  ###*
    @param {este.Route} route
    @param {Object=} params
    @return {!goog.Promise}
  ###
  load: (route, params) ->
    ok = -> goog.Promise.resolve goog.net.HttpStatus.OK
    notFound = -> goog.Promise.reject goog.net.HttpStatus.NOT_FOUND

    switch route
      when @routes.home
        ok()
      else
        notFound()
