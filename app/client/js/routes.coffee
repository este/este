goog.provide 'app.Routes'

goog.require 'este.Routes'

class app.Routes extends este.Routes

  ###*
    @constructor
    @extends {este.Routes}
  ###
  constructor: ->
    super()
    @home = new este.Route '/',
      'Home | Este.js'

    @list = [
      @home
    ]