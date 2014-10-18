goog.provide 'server.Storage'

goog.require 'este.Storage'

class server.Storage extends este.Storage

  ###*
    @param {app.Routes} routes
    @constructor
    @extends {este.Storage}
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
