exports.index = (req, res) ->
  res.render 'index',
    title: 'github.com/steida/este'
    appVersion: require('../../../package.json').version