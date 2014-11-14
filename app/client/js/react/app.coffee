goog.provide 'app.react.App'

class app.react.App

  ###*
   @param {app.Routes} routes
   @param {app.react.Header} header
   @param {app.react.pages.Todos} todosPage
   @param {app.todos.Store} todosStore
   @param {este.react.Element} element
   @constructor
  ###
  constructor: (routes, header, todosPage, todosStore, element) ->
    {div} = element

    @component = React.createFactory React.createClass

      render: ->
        div id: 'este-app',
          header.component {}
          # Use routes.active == routes.foo to render foo page.
          todosPage.component {}

      componentDidMount: ->
        todosStore.listen 'change', @updateUI

      updateUI: ->
        @forceUpdate()
