###*
  @fileoverview We use models for descripting our app core logic. Model is
  single source of truth. We can have several UI components, but all have to
  render data from one model. This is model describing one todo item.
  We are subclassing este.Model, because it gives us easy ability to listen
  model changes and validate model's state.
###
goog.provide 'app.todos.Model'

goog.require 'este.Model'

class app.todos.Model extends este.Model

  ###*
    @param {Object=} json Optional JSON to fulfil model.
    @constructor
    @extends {este.Model}
  ###
  constructor: (json) ->
    super json

  ###*
    This property is used for este.storage.* to autogenerate model endpoint.
    @override
  ###
  url: '/todos'

  ###*
    Set default model state.
    @override
  ###
  defaults:
    'title': ''

  ###*
    Define valid model state. Angular and other HTML first oriented frameworks
    put their validation rules into HTML. But such approach does not scale.
    Image you have two or more views for one model. You would have to repeat
    model's validation rules everywhere. Or make one common parent, but that's
    wrong to because UI behaviour should be separated from core business logic.
    @override
  ###
  schema:
    'title':
      'set': este.model.setters.trim
      'validators': [
        este.validators.required()
      ]