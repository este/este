# Google Closure server side integration.
require '../../bower_components/closure-library/closure/goog/bootstrap/nodejs.js'
require '../../client/deps.js'

config = require './config'
di = require 'di'

start = ->
  module =
    app: ['factory', require './app']
    appVersion: ['value', require('../../package.json').version]
    config: ['value', config]
    express: ['value', require 'express']
    http: ['value', require 'http']
    loadJsonSeed: ['factory', require './loadjsonseed']
    logger: ['factory', require './logger']
    React: ['value', require('react-tools').React]
    renderReact: ['factory', require './renderreact']
    winston: ['value', require 'winston']

    homeController: ['factory', require './home/controller']
    setRoutes: ['factory', require './setroutes']
    runServer: ['factory', require './runserver']

  injector = new di.Injector [module]
  injector.invoke (setRoutes, runServer) ->
    setRoutes()
    runServer()

if config.env.development
  start() if require('piping')()
else
  start()