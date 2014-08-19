goog.provide 'server.Storage'

goog.require 'este.labs.Storage'

class server.Storage extends este.labs.Storage

  ###*
    @constructor
    @extends {este.labs.Storage}
    @final
  ###
  constructor: ->
    super()

  ###*
    @override
  ###
  load: (route, params, routes) ->
    switch route
      when routes.home
        @ok()
      else
        @notFound()
