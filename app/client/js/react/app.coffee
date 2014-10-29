goog.provide 'app.react.App'

class app.react.App

  ###*
   @param {app.react.Header} header
   @param {app.react.pages.Todos} todosPage
   @constructor
  ###
  constructor: (header, todosPage) ->
    {div} = React.DOM

    @component = React.createFactory React.createClass

      render: ->
        div id: 'este-app',
          header.component {}
          # Here you can choose another page by routes.active route.
          todosPage.component {}
