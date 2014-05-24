/** @jsx React.DOM */
goog.provide('app.react.App');

/**
 * @param {app.react.Header} header
 * @param {app.todos.react.Page} todosPage
 * @constructor
 */
app.react.App = function(header, todosPage) {
  var Header = header.create;
  var TodosPage = todosPage.create;

  this.create = React.createClass({

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