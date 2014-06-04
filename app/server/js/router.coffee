goog.provide 'server.Router'

class server.Router

  ###*
    @param {server.FrontPage} frontPage
    @param {app.react.App} todoApp
    @param {app.Routes} routes
    @constructor
  ###
  constructor: (@frontPage, @todoApp, @routes) ->

  use: (app) ->
    @routes.addToExpress app, (req, res) =>
      title = @routes.getActive().title
      html = @frontPage.render title, @todoApp.create
      res['send'] html