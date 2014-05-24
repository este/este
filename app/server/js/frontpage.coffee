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
    @param {function(): React.ReactComponent} reactComponent
    @return {string} Rendered HTML.
  ###
  render: (title, reactComponent) ->
    bodyHtml = @getBodyHtml reactComponent
    html = React.renderComponentToStaticMarkup @reactApp.create
      bodyHtml: bodyHtml
      buildNumber: @buildNumber
      isDev: @isDev
      title: title

    # React can't render doctype so we have to manually add it.
    '<!DOCTYPE html>' + html

  ###*
    Body HTML must be injected to prevent content escaping.
    @param {function(): React.ReactComponent} reactComponent
    @return {string}
  ###
  getBodyHtml: (reactComponent) ->
    bodyHtml = React.renderComponentToString reactComponent()
    bodyHtml += "<script>app.main(#{JSON.stringify @clientData});</script>"
    if @isDev
      bodyHtml += '<script src="http://localhost:35729/livereload.js"></script>'
    bodyHtml