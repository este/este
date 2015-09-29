var spawn = require('child_process').exec;
var path = require('path');

module.exports = function postInstall() {
  console.log('[este-dev] Installing packages, this may take a while...');

  return process.env.DYNO
    ? postInstallHeroku()
    : postInstallDev();
};

/**
 * Installs dependencies for web & native
 *
 * CLI equvialent is:
 * cd web && npm install
 * cd native && npm install
 */
function postInstallDev() {
  var webPath = path.join(process.cwd(), './web');
  var nativePath = path.join(process.cwd(), './native');

  _installDependencies(webPath, function(err) {
    console.log(!err
      ? '[este-dev] Web dependencies installed successfully'
      : err.message);
  });

  _installDependencies(nativePath, function(err) {
    console.log(!err
      ? '[este-dev] Native dependencies installed successfully'
      : err.message);
  });
}

/**
 * Installs dependencies for web only on Heroku
 *
 * CLI equvialent is:
 * cd web && npm install
 */
function postInstallHeroku() {
  var webPath = path.join(process.cwd(), './web');

  _installDependencies(webPath, function(err, stdout) {
    console.log(!err
      ? '[este-dev] Heroku web dependencies installed successfully'
      : err.message);
  });
}

function _installDependencies(withFolder, callback) {
  var options = {
    cwd: withFolder
  };
  spawn('npm install', options, callback);
}
