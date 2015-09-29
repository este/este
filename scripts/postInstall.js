var path = require('path');
var spawnInFolder = require('./utils').spawnInFolder;
var Promise = require('bluebird');
var fs = require('fs-extra');

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

  return Promise
    .all([
      spawnInFolder('npm link ../common', webPath),
      spawnInFolder('npm link ../common', nativePath)
    ])
    .catch(function onLinkError(err) {
      if (err.code !== 'EEXIST') throw err;
    })
    .then(function installDependencies() {
      return Promise.all([
        spawnInFolder('npm install', webPath),
        spawnInFolder('npm install', nativePath)
      ]);
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
  var modulesFolder = path.join(webPath, 'node_modules/@este');
  var destFolder = path.join(webPath, 'node_modules/@este/common')
  var commonPath = path.join(webPath, '../common');

  fs.mkdirpSync(modulesFolder);
  fs.copySync(commonPath, destFolder);

  return spawnInFolder('npm install', destFolder)
    .then(function installDependencies() {
      return spawnInFolder('npm install', webPath)
    })
    .then(function buildApplication() {
      return spawnInFolder('npm run build', webPath);
    });
}
