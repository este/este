goog.provide 'app.Title'

goog.require 'goog.net.HttpStatus'

class app.Title
  @MSG_FOO: "FOO"
  @MSG_HOME: "HOME"
  @MSG_NOT_FOUND: "404"
  
  ###*
    @param {app.Routes} routes
    @constructor
  ###
  constructor: (@routes) ->

  ###*
    @return {string}
  ###
  get: ->
    switch @routes.active
      when @routes.home then Title.MSG_HOME
      when @routes.foo then Title.MSG_FOO
      else @routes.active.path

