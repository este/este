goog.provide 'app.react.pages.Users'

class app.react.pages.Users

  ###*
    @param {app.users.Store} store
    @constructor
  ###
  constructor: (store) ->
    {div,h1,ul,li,br,span,input,button} = React.DOM

    @create = React.createClass
      
      getInitialState: ->
        userName: ''
        userSurname: ''

      render: ->
        div className: 'foo-page',
          h1 {}, 'Listing users'
          ul {}, store.users.map @renderUser
          h1 {}, 'New User'
          span {}, 'Name:'
          br()
          input
            onChange: @userNameHandler
            value: @state.userName
          br()
          span {}, 'Surname:'
          br()
          input
            onChange: @userSurnameHandler
            value: @state.userSurname
          br()
          button {onClick: @createUser}, "Create"
      
      renderUser: (user, i) ->
        li key: i,
          "#{user['name']} #{user['surname']}"

      userNameHandler: (e) ->
        @setState userName: e.target.value
      
      userSurnameHandler: (e) ->
        @setState userSurname: e.target.value
      
      componentDidMount: ->
        store.reload()

      createUser: ->
        store.add
          'name': @state.userName
          'surname': @state.userSurname