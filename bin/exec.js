var exec = require('child_process').exec;

module.exports = function spawn(cmd, cwd, cb) {
  var child = exec(cmd, {cwd: cwd}, cb);
  child.stdout.on('data', function (data) {
    process.stdout.write(data);
  });
  child.stderr.on('data', function (data) {
    process.stderr.write(data);
  });
};
