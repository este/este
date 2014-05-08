/** @jsx React.DOM */
goog.provide('app.react.Header');

/**
 * @constructor
 */
app.react.Header = function() {

  this.reactClass = React.createClass({

    render: function() {
      return (
        <h3>Simple Isomorphic TodoApp Demo</h3>
      );
    }

  });

};