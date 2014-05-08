/** @jsx React.DOM */
goog.provide('app.react.App');

/**
 * @param {app.react.Header} header
 * @param {app.todos.react.Page} todosPage
 * @constructor
 */
app.react.App = function(header, todosPage) {
  var Header = header.reactClass;
  var TodosPage = todosPage.reactClass;

  this.reactClass = React.createClass({

    render: function() {
      return (
        <div id="este-app">
          <Header />
          <TodosPage />
        </div>
      );
    }

  });

};