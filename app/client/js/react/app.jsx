/** @jsx React.DOM */
goog.provide('app.react.App');

/**
 * @param {app.todos.Collection} todos
 * @constructor
 */
app.react.App = function(todos) {

  var TodoList = React.createClass({
    render: function() {
      var createItem = function(itemText, i) {
        return <li key={i}>{itemText}</li>;
      };
      return <ul>{this.props.items.map(createItem)}</ul>;
    }
  });

  this.reactClass = React.createClass(/** @lends {React.ReactComponent.prototype} */{
    getInitialState: function() {
      return {text: ''};
    },
    onChange: function(e) {
      this.setState({text: e.target.value});
    },
    onFormSubmit: function(e) {
      e.preventDefault();
      todos.add(this.state.text);
      this.setState({text: ''});
    },
    onButtonClick: function(e) {
      todos.clear();
    },
    render: function() {
      return (
        <div id="este-app">
          <h3>TODO</h3>
          <TodoList items={todos.items} />
          <form onSubmit={this.onFormSubmit}>
            <input onChange={this.onChange} value={this.state.text} />
            <button>{'Add #' + (todos.items.length + 1)}</button>
          </form>
          <button onClick={this.onButtonClick}>Clear</button>
        </div>
      );
    }
  });
};