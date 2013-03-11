env = process.env.NODE_ENV || 'development'
appName = 'Este'
port = process.env.PORT || 8000

exports = module.exports =
  appName: appName
  server:
    port: port
    url: if process.env.SUBDOMAIN
      "http://#{process.env.SUBDOMAIN}.jit.su/"
    else
      "http://localhost:#{port}/"
  env:
    development: false
    staging: false
    production: false
  log:
    __dirname + "/log/app_#{env}.log"
  db:
    url: "mongodb://localhost:27017/#{appName.toLowerCase()}_#{env}"

exports.env[env] = true
exports.currentEnv = env