goog.provide 'server.Storage'

goog.require 'este.labs.Storage'

class server.Storage extends este.labs.Storage

  ###*
    @param {app.Routes} routes
    @constructor
    @extends {este.labs.Storage}
    @final
  ###
  constructor: (@routes) ->
    super()

  ###*
    @override
  ###
  load: (route, params) ->
    switch route
      when @routes.home
        @ok()
      else
        @notFound()
