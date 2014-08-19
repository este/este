goog.provide 'app.Title'

class app.Title

  ###*
    Isomorphic app title.
    @param {app.Routes} routes
    @constructor
  ###
  constructor: (@routes) ->

  get: ->
    switch @routes.active
      when @routes.home then 'Este.js demo'
      else 'Page not found.'
