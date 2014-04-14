goog.provide 'App'

class App

  ###*
    @param {Element} element
    @param {app.home.Controller} homeController
    @constructor
  ###
  constructor: (element, homeController) ->

    # Here will be full-fledged MVC framework soon. In the meantime, let's make
    # a simple React TodoMVC demo with server-side rendering.
    homeController.render element