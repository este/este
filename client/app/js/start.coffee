###*
  @fileoverview App start.
###

goog.provide 'app.start'

goog.require 'app.templates'
goog.require 'este.dev.Monitor.create'
goog.require 'goog.dom'
goog.require 'goog.events'

###*
  @param {Object} data JSON from server
###
app.start = (data) ->

  # use [] syntax for uncompiled json
  # e.g. data['someDataFromServer']

  if goog.DEBUG
    este.dev.Monitor.create()

  html = app.templates.callToAction action: 'click'

  box = goog.dom.createDom 'div',
    style: 'width: 17em; height: 4em; background-color: #ff8c55; padding: 1em'
    class: 'some-box'
    innerHTML: html
  document.body.appendChild box

  ###*
    @desc Text shown in alert after click.
  ###
  app.MSG_THANKYOU = goog.getMsg 'Thank you!'

  goog.events.listen box, 'click', ->
    alert app.MSG_THANKYOU

# ensures the symbol will be visible after compiler renaming
goog.exportSymbol 'app.start', app.start