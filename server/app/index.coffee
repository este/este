config = require './config'
express = require 'express'
http = require 'http'
path = require 'path'
routes = require './routes'

run = ->
  app = express()
  app.configure ->
    app.locals.env = config.currentEnv

    app.set 'title', 'github.com/steida/este'
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'
    app.use express.compress()
    app.use express.favicon()

    if config.env.development
      # app.use express.logger 'dev'
      app.locals.pretty = true

    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router

    if config.env.development
      app.use '/client', express.static 'client'
      app.use '/bower_components', express.static 'bower_components'
    else
      app.use '/client', express.static 'client'
      # because Este demos are uncompiled
      app.use '/bower_components', express.static 'bower_components'

    app.use (req, res) ->
      res.status 400
      res.render '404',
        title: '404: File Not Found'

    if config.env.development
      app.use express.errorHandler
        dumpExceptions: true
        showStack: true
    else
      app.use (err, req, res, next) ->
        res.status 500
        res.render '500',
          title: '500: Internal Server Error'
          error: error

  app.get '/', routes.index

  http.createServer(app).listen config.server.port, ->
    console.log "Express server listening on port #{config.server.port}"

if config.env.development
  run() if require('piping')()
else
  run()