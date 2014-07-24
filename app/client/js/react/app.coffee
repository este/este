goog.provide 'app.react.App'

class app.react.App

  ###*
    @param {app.Routes} routes
    @param {app.react.Header} header
    @param {app.react.pages.Todos} todos
    @param {app.react.pages.Foo} foo
    @param {app.react.pages.Users} users
    @param {app.react.pages.NotFound} notFound
    @constructor
  ###
  constructor: (routes, header, todos, foo, users, notFound) ->
    {div} = React.DOM

    @create = React.createClass

      render: ->
        div id: 'este-app',
          header.create()
          @page()
      page: ->
        switch routes.active
          when routes.home then todos.create()
          when routes.foo then foo.create()
          when routes.users then users.create()
          else
            notFound.create()
        