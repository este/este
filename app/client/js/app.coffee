goog.provide 'App'

class App

  ###*
    @param {este.Router} router
    @param {app.Routes} routes
    @param {app.Title} appTitle
    @param {app.todos.Store} todosStore
    @param {app.users.Store} usersStore
    @param {app.react.App} reactApp
    @param {Element} element
    @constructor
  ###
  constructor: (router, routes, appTitle, todosStore, usersStore, reactApp, element) ->
    reactAppComponent = null

    onRouterError = (e) ->
      console.log e.reason

    syncUI = ->
      document.title = appTitle.get()
      if !reactAppComponent
        reactAppComponent = React.renderComponent reactApp.create(), element
        return
      reactAppComponent.forceUpdate()

    routes.addToEste router
    router.listen 'error', onRouterError

    routes.listen 'change', syncUI
    todosStore.listen 'change', syncUI
    usersStore.listen 'change', syncUI
    
    router.start()