###*
  @fileoverview Example of Este application. 'app.start()' is the only code
  directly called from HTML template, see: este/server/app/views/index.jade.
  This example uses simple TodoMVC component. For full-fledged TodoMVC app
  check este/bower_components/este-library/este/demos/app/todomvc/index.html.
  Read the code and comments to see how things works.
###

# This is how we declare namespace in Google Closure.
goog.provide 'app.start'

# Let's require what our app needs. You don't have to maintain list of script
# tags in <head>. Everything is resolved, loaded and builded automatically.
goog.require 'app.todos.create'
goog.require 'este.dev.Monitor.create'

###*
  Our application probably needs some server side seed data. Serialize your
  server side model into plain JSON and pass it into app.start method.

  Example:
  app.start({
    "user": {
      "name": 'Joe Satriani',
      "id": '123'
    }
  });

  Este uses advanced level of Closure Compiler by default. Read
  https://developers.google.com/closure/compiler/docs/api-tutorial3#better

  All code is ultimately minified with unbeatable level of compression.
  But server side JSON (or external libraries like jQuery) not. To access
  server side JSON, use [] syntax.

  Example:
  alert data['user']['name']

  To access external libraries like jQuery (you don't need that), use externs:
  https://developers.google.com/closure/compiler/docs/api-tutorial3#externs
  Then you don't have use [] syntax.

  Example:
  $('button.continue').html('Next Step...'');

  @param {Object} data JSON from server
###
app.start = (data) ->

  # Dev monitor shows count of all registered events in our app in bottom right
  # of screen. It helps us to catch leaking events during development. For
  # production dev monitor is entirely removed, becased goog.DEBUG define is
  # set to false (see Gruntfile.coffee esteBuilder task) so Closure Compiler will
  # remove all dead code.
  if goog.DEBUG
    este.dev.Monitor.create()

  # Create simple TodoMVC component via its factory method. Factories are
  # must-have for clean code. It helps us to separate app logic (classes)
  # and app wiring (factories). With such approach, we have nice testable
  # and reusable code with low costs of app design change.
  # Maybe you will be surprised how many files/classes we used for such simple
  # task. But that's a good thing. Many classes means many seams to reconfigure
  # and reuse our code. With Este dev stack development is smooth. Just create
  # something.coffee|js, and require it where you want to use it.
  app.todos.create '#todo-mvc'

# Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol 'app.start', app.start