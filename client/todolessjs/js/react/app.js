/** @jsx React.DOM */
goog.provide('todolessjs.react.App');

/**
 * @param {todolessjs.todos.Collection} todos
 * @constructor
 */
todolessjs.react.App = function(todos) {

  var TodoList = React.createClass({displayName: 'TodoList',
    render: function() {
      var createItem = function(itemText, i) {
        return React.DOM.li( {key:i}, itemText);
      };
      return React.DOM.ul(null, this.props.items.map(createItem));
    }
  });

  this.reactClass = React.createClass(/** @lends {React.ReactComponent.prototype} */{displayName: 'reactClass',
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
        React.DOM.div(null, 
          React.DOM.h3(null, "TODO"),
          TodoList( {items:todos.items} ),
          React.DOM.form( {onSubmit:this.onFormSubmit}, 
            React.DOM.input( {onChange:this.onChange, value:this.state.text} ),
            React.DOM.button(null, 'Add #' + (todos.items.length + 1))
          ),
          React.DOM.button( {onClick:this.onButtonClick}, "Clear")
        )
      );
    }
  });
};