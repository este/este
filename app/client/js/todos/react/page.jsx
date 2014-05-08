/** @jsx React.DOM */
goog.provide('app.todos.react.Page');

/**
 * @param {app.todos.Storage} storage
 * @constructor
 */
app.todos.react.Page = function(storage) {

  this.reactClass = React.createClass({

    getInitialState: function() {
      return {
        text: ''
      };
    },

    render: function() {
      var todos = storage.getTodos();

      return (
        <div className="todos-page">
          <ul>
            {todos.map(this.createTodo)}
          </ul>
          <form onSubmit={this.onNewTodoFormSubmit}>
            <input
              onChange={this.onNewTodoInputChange}
              ref="newTodoInput"
              value={this.state.text} />
            <button>{'Add #' + (todos.length + 1)}</button>
          </form>
          <button onClick={this.onClearAllButtonClick}>Clear All</button>
        </div>
      );
    },

    createTodo: function(todo, i) {
      return (
        <li key={i}>
          {todo.title}
          <button
            className="complete"
            onClick={this.onCompleteButtonClick.bind(this, todo)}
          >✔</button>
        </li>
      );
    },

    componentDidMount: function() {
      storage.listen('change', this.onStorageChange);
    },

    onStorageChange: function(e) {
      this.forceUpdate();
    },

    onCompleteButtonClick: function(todo, e) {
      storage.remove(todo);
    },

    onNewTodoFormSubmit: function(e) {
      e.preventDefault();
      var title = this.state.text.trim();
      if (!title) {
        this.refs['newTodoInput'].getDOMNode().focus();
        return;
      }
      storage.add(title);
      this.setState({text: ''});
    },

    onNewTodoInputChange: function(e) {
      this.setState({text: e.target.value});
    },

    onClearAllButtonClick: function(e) {
      storage.clearAll();
    }

  });

};