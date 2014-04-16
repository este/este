goog.provide('Todolessjs');

/**
  @param {Element} element
  @param {todolessjs.todos.Collection} todos
  @param {todolessjs.react.App} reactApp
  @constructor
 */
var Todolessjs = function(element, todos, reactApp) {
  var reactAppComponent = React.renderComponent(reactApp.reactClass(), element);
  var observer = new goog.global['ArrayObserver'](todos.items);
  observer.open(function() {
    return reactAppComponent.forceUpdate();
  });
  if (!Object['observe']) {
    setInterval(goog.global['Platform']['performMicrotaskCheckpoint'], 50);
  }
  return;
}