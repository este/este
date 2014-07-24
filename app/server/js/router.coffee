###*
  @fileoverview
  @suppress {checkTypes}
###
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
      title = @routes.active.title
      html = @frontPage.render title, @todoApp.create
      res['send'] html

    mongoose = require("mongoose")
    baucis = require("baucis")
    mongoose.connect "mongodb://localhost/trackr"
    User = new mongoose.Schema(
      name: String
      surname: String
      projects: [
        type: mongoose.Schema.Types.ObjectId
        ref: "Project"
      ]
    )
    Task = new mongoose.Schema(
      name: String
      user:
        type: mongoose.Schema.Types.ObjectId
        ref: "User"
    )
    Project = new mongoose.Schema(name: String)
    mongoose.model "user", User
    mongoose.model "task", Task
    mongoose.model "project", Project
    baucis.rest("user")
    baucis.rest("task")
    baucis.rest("project")
    app.use('/api/v1', baucis());