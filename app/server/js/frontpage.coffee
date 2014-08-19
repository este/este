goog.provide 'server.FrontPage'

class server.FrontPage

  ###*
    @param {server.react.App} serverApp
    @param {app.react.App} app
    @param {app.Title} appTitle
    @param {Object} clientData
    @param {number} version
    @param {boolean} isDev
    @constructor
  ###
  constructor: (@serverApp, @app, @appTitle, @clientData, @version, @isDev) ->

  ###*
    @return {string} HTML string
  ###
  render: ->
    appHtml = React.renderComponentToString @app.component()
    scriptsHtml = @getScriptsHtml()

    html = React.renderComponentToStaticMarkup @serverApp.component
      bodyHtml: appHtml + scriptsHtml
      title: @appTitle.get()
      version: @version

    # Add doctype manually because React doesn't support it.
    '<!DOCTYPE html>' + html

  ###*
    @return {string}
  ###
  getScriptsHtml: ->
    scripts = ['/app/client/build/app.js?v=' + @version]
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
