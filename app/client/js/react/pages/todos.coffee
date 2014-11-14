goog.provide 'app.react.pages.Todos'

goog.require 'app.todos.Todo'

class app.react.pages.Todos

  ###*
    @param {app.Actions} actions
    @param {app.todos.Store} todosStore
    @param {este.react.Element} element
    @constructor
  ###
  constructor: (actions, todosStore, element) ->
    {div, ul, li, button, form, input} = element

    state =
      newTodo: new app.todos.Todo

    @component = React.createFactory React.createClass

      render: ->
        div className: 'todos-page',
          ul {}, todosStore.todos.map (todo, i) =>
            li key: i,
              todo.title
              button
                className: 'complete'
                onClick: @onCompleteButtonClick.bind @, todo
              , '✔'
          form onSubmit: @onNewTodoFormSubmit,
            input
              autoFocus: true
              onChange: @onNewTodoInputChange
              ref: 'newTodoInput'
              value: state.newTodo.title
            button {}, "Add ##{todosStore.todos.length + 1}"
          button onClick: @onClearTodosButtonClick, 'Clear All'

      onCompleteButtonClick: (todo) ->
        actions.completeTodo todo

      onNewTodoFormSubmit: (e) ->
        e.preventDefault()
        title = state.newTodo.title?.trim()
        if !title
          @refs.newTodoInput.getDOMNode().focus()
          return
        actions.addTodo state.newTodo
          .then =>
            state.newTodo = new app.todos.Todo
            @forceUpdate()

      onNewTodoInputChange: (e) ->
        state.newTodo.title = e.target.value
        @forceUpdate()

      onClearTodosButtonClick: (e) ->
        actions.clearTodos()
