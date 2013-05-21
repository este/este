exports.index = (req, res) ->
  res.render 'index',
    title: 'github.com/Steida/este'
    appVersion: require('../../../package.json').version