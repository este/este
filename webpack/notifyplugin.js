/* @flow weak */

'use strict';

var notifier = require('node-notifier');
var path = require('path');

function getLocMessage(error, loc) {
  var filePath = error.module.resource.split(path.sep);
  return [
    filePath[filePath.length - 1],
    ' at [',
    loc.line,
    ',',
    loc.column,
    ']'
  ].join('');
}

module.exports = function() {
  this.plugin('done', function(stats) {
    // TODO: Handle warnings as well.
    var error = stats.compilation.errors[0];
    if (!error) return;
    var loc = error.error.loc;
    var msg;
    if (loc)
      msg = getLocMessage(error, loc);
    else if (error.message)
      msg = error.message;
    else return;

    notifier.notify({
      title: 'Webpack Error',
      message: msg
    });
  });
};
