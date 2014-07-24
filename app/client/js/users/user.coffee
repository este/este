goog.provide 'app.users.User'

class app.users.User

  ###*
    @param {Object} json
    @constructor
  ###
  constructor: (json) ->
    goog.mixin this, json || {}

  ###*
    @type {string}
  ###
  name: ''

  ###*
    @type {string}
  ###
  surname: ''