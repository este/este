module.exports = (React) ->

  (name, params, callback) ->
    # File is loaded once, but we don't need to restart Node unless client
    # React rendering is enabled.
    goog.require name
    component = getComponentFromGlobal name
    React.renderComponentToString component(params), (html) ->
      callback html

getComponentFromGlobal = (name) ->
  component = global
  for n in name.split '.'
    component = component[n]
  component