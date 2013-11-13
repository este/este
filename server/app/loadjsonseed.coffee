module.exports = ->
  jsonSeed =
    todoApp:
      items: [
        'Check how this React component is rendered on server :-)'
      ]

  (callback) ->
    callback jsonSeed