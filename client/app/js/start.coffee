###*
  @fileoverview Our application main entry point.

  This example demonstrates a simple TodoMVC component. For full TodoMVC app:
  @see este/bower_components/este-library/este/demos/app/todomvc/index.html.
###

# This is how we provide namespaces.
goog.provide 'app.start'

# Let's require what our app needs.
goog.require 'este.demos.react.start'

###*
  App main entry point. This function should be called before body closing tag.
  @param {Object} data Server side JSON data.
###
app.start = (data) ->

  ###
    Our application probably needs some server side data. Serialize your
    server side model into plain JSON and pass it into 'app.start' method.

    Example:
    app.start({
      "user": {
        "id": '123',
        "name": 'Joe Satriani'
      }
    });

    Este uses closure compiler advanced level by default. Read:
    https://developers.google.com/closure/compiler/docs/api-tutorial3#better

    All code is ultimately minified with unbeatable level of compression,
    except server side JSON. To access server side JSON, use [] syntax.

    Example:
    alert data['user']['name']
  ###

  # Create simple TodoMVC component via its factory method.
  este.demos.react.start '#todo-mvc'

# Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol 'app.start', app.start