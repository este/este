goog.provide 'server.Router'

class server.Router

  ###*
    @param {server.home.Controller} homeController
    @constructor
  ###
  constructor: (@homeController) ->

  use: (app) ->
    routes =
      '/': @homeController

    for mask, controller of routes
      controller.use app['route'] mask