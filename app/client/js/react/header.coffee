goog.provide 'app.react.Header'

class app.react.Header

  ###*
    @param {app.Routes} routes
    @constructor
  ###
  constructor: (routes) ->
    {a,ul,li} = React.DOM

    @create = React.createClass

      render: ->
        ul className: 'menu',
          li {}, 
            a href:routes.home.createUrl(), 'Home'
          li {},
            a href:routes.foo.createUrl(), 'Foo'
          li {},
            a href:routes.users.createUrl(), 'Users'
