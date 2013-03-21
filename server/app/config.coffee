exports.appName = require('../../package').name

exports.currentEnv = process.env.NODE_ENV || 'development'
exports.env =
  development: false
  staging: false
  production: false
exports.env[exports.currentEnv] = true

port = process.env.PORT || 8000
exports.server =
  port: port
  apiKey: 'put-guid-here'
  url: if exports.env.development
    "http://localhost:#{port}/"
  else
    "http://#{process.env.SUBDOMAIN}.jit.su/"

exports.db =
  url: if exports.env.development
    "mongodb://localhost/#{exports.appName.toLowerCase()}"
  else
    "mongodb://nodejitsu:e7846ccb0a17797a8dc85fd1e220f2b6@alex.mongohq.com:10088/nodejitsudb310160275"
