module.exports = (http, app, config) ->

  ->
    http.createServer(app).listen config.server.port, ->
      console.log "Express server listening on port #{config.server.port}"