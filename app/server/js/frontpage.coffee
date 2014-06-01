goog.provide 'server.FrontPage'

class server.FrontPage

  ###*
    @param {server.react.App} reactApp
    @param {boolean} isDev
    @param {number} buildNumber
    @param {Object} clientData
    @constructor
  ###
  constructor: (@reactApp, @isDev, @buildNumber, @clientData) ->

  ###*
    @param {string} title
    @param {function(): React.ReactComponent} createReactApp
    @return {string} Rendered HTML.
  ###
  render: (title, createReactApp) ->
    appHtml = React.renderComponentToString createReactApp()
    scriptsHtml = @getScriptsHtml()

    html = React.renderComponentToStaticMarkup @reactApp.create
      bodyHtml: appHtml + scriptsHtml
      buildNumber: @buildNumber
      title: title

    # React can't render doctype so we have to manually add it.
    '<!DOCTYPE html>' + html

  getScriptsHtml: ->
    scripts = ['/app/client/build/app.js?v=' + @buildNumber]
    if @isDev then scripts.push [
      '/bower_components/closure-library/closure/goog/base.js'
      '/tmp/deps.js'
      '/app/client/js/main.js'
      'http://localhost:35729/livereload.js'
    ]...
    html = scripts
      .map (script) -> """<script src="#{script}"></script>"""
      .join ''
    html + "<script>app.main(#{JSON.stringify @clientData});</script>"