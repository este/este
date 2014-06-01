goog.provide 'server.react.App'

###*
  @constructor
###
server.react.App = ->
  {html,head,meta,title,link,body} = React.DOM

  @create = React.createClass

    render: ->
      html lang: 'en',
        head null,
          meta charSet: 'utf-8'
          meta
            name: 'viewport'
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          title null, @props.title
          link href: '/app/client/img/favicon.ico', rel: 'shortcut icon'
          link href: '/app/client/build/app.css?v=' + @props.buildNumber, rel: 'stylesheet'
        body
          # Because body contains components rendered with React attributes via
          # React.renderComponentToString, but this component is rendered via
          # React.renderComponentToStaticMarkup.
          dangerouslySetInnerHTML: __html: @props.bodyHtml