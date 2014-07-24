goog.provide 'app.users.Store'

goog.require 'app.users.User'
goog.require 'goog.array'
goog.require 'goog.events.EventTarget'
goog.require 'este.labs.Store'

class app.users.Store extends este.labs.Store

  ###*
    @constructor
    @extends {este.labs.Store}
    @final
  ###
  constructor: ->
    super()
    @itemConstructor = app.users.User
    @users = []

  ###*
    @type {Array.<app.users.User>}
  ###
  users: null
  initEndpoint: ->
    @endpoint ||= new Discuss("/api/v1/users")
    
  reload: ->
    @initEndpoint()
    @endpoint.get()
      .success (body) =>
        @users = body.map (item) => 
          new app.users.User(item)
        console.log(@users)
        @notify()
      .send()  
    
  ###*
    @param {Object} json
  ###
  add: (json) ->
    @initEndpoint()
    @endpoint.post()
      .body json
      .success (body) =>
        console.log(body)
        @users.push(new app.users.User body)
        @notify()
      .send()

  clearAll: ->
    @users.length = 0
    @notify()

  ###*
    @param {app.users.User} user
  ###
  remove: (user) ->
    goog.array.remove @users, user
    @notify()