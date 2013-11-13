module.exports = (config, express, logger) ->
  app = express()
  app.locals.env = config.currentEnv
  app.locals.pretty = config.env.development
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.compress()
  app.use express.favicon()
  app.use express.urlencoded()
  app.use express.json()
  app.use express.methodOverride()
  app.use app.router
  setStatics app, express, config.env.development
  set404 app, logger
  set500 app, logger
  app

setStatics = (app, express, development) ->
  if development
    app.use '/client', express.static 'client'
    app.use '/bower_components', express.static 'bower_components'
  else
    app.use '/client', express.static 'client'
    # Because Este demos are uncompiled, but you should remove this line.
    app.use '/bower_components', express.static 'bower_components'

set404 = (app, logger) ->
  app.use (req, res) ->
    logger.warn "404: #{req.path}"
    res.status 400
    res.render '404',
      title: '404: File Not Found'

set500 = (app, logger) ->
  app.use (err, req, res, next) ->
    logger.error err.stack
    res.status 500
    res.render '500',
      title: '500: Internal Server Error'
      error: err