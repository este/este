currentEnv = process.env.NODE_ENV || 'development'
port = process.env.PORT || 8000

module.exports =
  env:
    development: currentEnv == 'development'
    staging: currentEnv == 'staging'
    production: currentEnv == 'production'
  server:
    port: port
    url: if currentEnv == 'development'
      "http://localhost:#{port}/"
    else
      "http://#{process.env.SUBDOMAIN}.jit.su/"