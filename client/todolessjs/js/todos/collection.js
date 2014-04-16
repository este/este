goog.provide('todolessjs.todos.Collection');
goog.require('todolessjs.todos.Model');

/**
  @constructor
 */
todolessjs.todos.Collection = function() {
  this.items = [];
}

/**
  @type {Array.<todolessjs.todos.Model>}
 */
todolessjs.todos.Collection.prototype.items = null;

/**
  @param {string} text
 */
todolessjs.todos.Collection.prototype.add = function(text) {
  var todo;
  todo = new todolessjs.todos.Model(text);
  return this.items.push(todo);
};
todolessjs.todos.Collection.prototype.clear = function() {
  return this.items.length = 0;
};