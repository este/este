var spawn = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');

module.exports = {

  // Small wrapper that prints the output of executed command
  // to stdout/stderr
  spawnInFolder: function(cmd, cwd) {
    return Promise.fromNode(function(callback) {
      var child = spawn(cmd, {cwd: cwd}, callback);
      child.stdout.on('data', function (data) {
        process.stdout.write(data.toString());
      });
      child.stderr.on('data', function (data) {
        process.stdout.write(data.toString());
      });
    });
  }

}
