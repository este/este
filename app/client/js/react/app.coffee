goog.provide 'app.react.App'

class app.react.App

  ###*
   @param {app.react.Header} header
   @param {app.react.pages.Todos} todosPage
   @constructor
  ###
  constructor: (header, todosPage) ->
    {div} = React.DOM

    @create = React.createClass

      render: ->
        div id: 'este-app',
          header.create null
          todosPage.create null