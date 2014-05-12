/** @jsx React.DOM */
goog.provide('app.todos.react.Page');

/**
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Page = function(store) {

  this.reactClass = React.createClass({

    getInitialState: function() {
      return {
        text: ''
      };
    },

    render: function() {
      var todos = store.getTodos();

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
      store.listen('change', this.onStoreChange);
    },

    onStoreChange: function(e) {
      this.forceUpdate();
    },

    onCompleteButtonClick: function(todo, e) {
      store.remove(todo);
    },

    onNewTodoFormSubmit: function(e) {
      e.preventDefault();
      var title = this.state.text.trim();
      if (!title) {
        this.refs['newTodoInput'].getDOMNode().focus();
        return;
      }
      store.add(title);
      this.setState({text: ''});
    },

    onNewTodoInputChange: function(e) {
      this.setState({text: e.target.value});
    },

    onClearAllButtonClick: function(e) {
      store.clearAll();
    }

  });

};