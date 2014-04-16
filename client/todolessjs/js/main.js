goog.provide('todolessjs.main');
goog.require('app.DiContainer');

/**
  @param {Object} data Server side data. Useful for config, preload, whatever.
 */
todolessjs.main = function(data) {
  var container;
  container = new app.DiContainer;
  container.configure({
    resolve: Todolessjs,
    "with": {
      element: document.querySelector('#este-app')
    }
  });
  return container.resolveApp();
};
goog.exportSymbol('todolessjs.main', todolessjs.main);