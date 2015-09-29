var spawnInFolder = require('./utils').spawnInFolder;
var path = require('path');
var fs = require('fs-extra');

module.exports = function preInstall() {
  return process.env.DYNO
    ? preInstallHeroku()
    : preInstallDev();
};

/**
 * Preinstall script that executes and works in most environments
 * It links ./common folder to web and native, so you can require it
 * just like any other npm downloaded library
 *
 * CLI equvialent is:
 * cd web && npm install ../common
 * cd native && npm link ../common
 */
function preInstallDev() {
  var webPath = path.join(process.cwd(), './web');
  var nativePath = path.join(process.cwd(), './native');

  spawnInFolder('npm link ' + path.join(webPath, '../common'), webPath);
  spawnInFolder('npm link ' + path.join(nativePath, '../common'), webPath);
}

/**
 * Since Heroku builds your app in a /tmp directory,
 * linking is not going to work in there.
 * That is, you need to copy the folder manually.
 * Just because it's Heroku, we do not care about native.
 *
 * CLI equvialent is:
 * cd web && cp ../common ./node_modules/@este/common
 * cd ./node_modules/@este/common && npm install
 */
function preInstallHeroku() {
  var webPath = path.join(process.cwd(), './web');
  var modulesFolder = path.join(webPath, 'node_modules/@este');
  var destFolder = path.join(webPath, 'node_modules/@este/common')

  fs.mkdirpSync(destFolder);
  fs.copySync(commonPath, destFolder);

  spawnInFolder('npm install', destFolder, callback);
}
