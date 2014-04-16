goog.provide('todolessjs.main');
goog.require('todolessjs.DiContainer');

/**
  @param {Object} data Server side data. Useful for config, preload, whatever.
 */
todolessjs.main = function(data) {
  var container = new todolessjs.DiContainer;
  container.configure({
    resolve: Todolessjs,
    "with": {
      element: document.querySelector('#este-app')
    }
  });
  return container.resolveTodolessjs();
};
goog.exportSymbol('todolessjs.main', todolessjs.main);