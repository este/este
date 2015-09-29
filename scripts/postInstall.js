var path = require('path');
var spawnInFolder = require('./utils').spawnInFolder;

module.exports = function postInstall() {
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

  spawnInFolder('npm install', webPath);
  spawnInFolder('npm install', nativePath);
}

/**
 * Installs dependencies for web only on Heroku
 *
 * CLI equvialent is:
 * cd web && npm install
 */
function postInstallHeroku() {
  var webPath = path.join(process.cwd(), './web');

  spawnInFolder('npm install', webPath);
}
