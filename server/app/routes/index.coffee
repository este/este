exports.index = (req, res) ->
  res.render 'index',
    title: 'Este.js'
    appVersion: require('../../../package.json').version