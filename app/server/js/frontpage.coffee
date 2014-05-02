goog.provide 'server.FrontPage'

class server.FrontPage

  ###*
    @param {boolean} isDev
    @param {number} buildNumber
    @param {Object} clientData
    @constructor
  ###
  constructor: (@isDev, @buildNumber, @clientData) ->

  ###*
    We can not use React because it doesn't support conditional comments nor
    <!DOCTYPE html>. Plain string is just fine for static HTML.
    @param {string} title
    @param {function(): React.ReactComponent} reactComponent
    @return {string} Rendered HTML.
  ###
  render: (title, reactComponent) ->
    reactComponentHtml = React.renderComponentToString reactComponent()

    headScripts = """
      <script src="/app/client/build/app.js?v=#{@buildNumber}"></script>
    """
    if @isDev
      headScripts += """
        <script src="/bower_components/closure-library/closure/goog/base.js"></script>
        <script src="/tmp/deps.js"></script>
        <script src="/app/client/js/main.js"></script>
      """

    bodyScripts = """
      <script>app.main(#{JSON.stringify @clientData});</script>
    """

    if @isDev
      bodyScripts += """
        <script src="http://localhost:35729/livereload.js"></script>
      """

    """
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>#{title}</title>
          <link href="/app/client/img/favicon.ico" rel="shortcut icon" />
          <link href="/app/client/build/app.css?v=#{@buildNumber}" rel="stylesheet" />
          #{headScripts}
        </head>
        <body>
          #{reactComponentHtml}
          #{bodyScripts}
        </body>
      </html>
    """