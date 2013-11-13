appName = require('../../package').name
currentEnv = process.env.NODE_ENV || 'development'
port = process.env.PORT || 8000
env =
  development: false
  staging: false
  production: false
env[currentEnv] = true

module.exports =
  appName: appName
  currentEnv: currentEnv
  env: env
  server:
    port: port
    apiKey: 'put-guid-here'
    url: if env.development
      "http://localhost:#{port}/"
    else
      "http://#{process.env.SUBDOMAIN}.jit.su/"
  db:
    url: if env.development
      "mongodb://localhost/#{appName.toLowerCase()}"
    else
      "__production config__"