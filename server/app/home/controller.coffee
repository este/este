module.exports = (loadJsonSeed, renderReact, appVersion) ->

  (req, res) ->

    loadJsonSeed (jsonSeed) ->

      renderReact 'este.demos.react.todoApp', jsonSeed.todoApp, (html) ->

        res.render 'home',
          title: 'Este.js'
          html: html
          jsonSeed: JSON.stringify jsonSeed
          appVersion: appVersion