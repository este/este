goog.provide 'app.react.pages.Foo'

class app.react.pages.Foo

  ###*
    @constructor
  ###
  constructor: () ->
    {div,h1} = React.DOM

    @create = React.createClass

      render: ->
        div className: 'foo-page',
          h1 {}, 'This is foo'
