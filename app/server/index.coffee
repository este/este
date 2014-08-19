config = require './config'

if !config.env.development || require('piping')()

  # Server-side Google Closure for development.
  if config.env.development
    require '../../bower_components/closure-library/closure/goog/bootstrap/nodejs.js'
    require '../../tmp/deps.js'

  # Mock client-side stuff for server-side.
  global.React = require 'react/addons'
  doc = require('jsdom').jsdom()
  global.window = doc.parentWindow
  global.document = doc.parentWindow.document

  # Require uncompiled/compiled server code.
  if config.env.development
    goog.require 'server.main'
  else
    require './build/app'

  server.main config