var spawn = require('child_process').spawn;

module.exports = function(cmd, cwd, cb) {
  var args = cmd.split(' ');
  var cmd = args.shift(); // we love mutability hehe

  var child = spawn(cmd, args, {cwd: cwd, stdio: 'inherit'});
  
  child.on('exit', function(exitCode) {
    if (!cb || typeof cb !== 'function') return;
    cb(exitCode === 0 ? null : new Error('Exited with code ' + exitCode));
  });
};
