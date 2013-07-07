###*
  @fileoverview We use models for descripting our app core business logic.
  Model is single source of truth. Subclassing from este.Model allow us to
  listen model changes and validate model state too.
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
    Describe default model state.
    @override
  ###
  defaults:
    'title': ''

  ###*
    Define valid model state. Angular and other HTML first oriented frameworks
    put their validation rules into HTML, but such approach does not scale.
    Imagine you have two or more views of one model. You would have to repeat
    model's validation rules everywhere in HTML.
    @override
  ###
  schema:
    'title':
      'set': este.model.setters.trim
      'validators': [
        este.validators.required()
      ]