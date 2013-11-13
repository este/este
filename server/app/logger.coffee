module.exports = (winston) ->
  new winston.Logger
    transports: [
      new winston.transports.Console
        uncaughtException: true
    ]