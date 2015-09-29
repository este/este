var spawn = require('child_process').exec;
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

  _linkCommonFolder(webPath, function(err) {
    console.log(!err
      ? '[este-dev] Preinstall successfull'
      : err.message);
  });

  _linkCommonFolder(nativePath, function(err) {
    console.log(!err
      ? '[este-dev] Preinstall successfull'
      : err.message);
  });
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

  _linkCommonFolderHeroku(webPath, function(err, stdout) {
    console.log(!err
      ? '[este-dev] Heroku Preinstall successfull'
      : err.message);
  });
}

function _linkCommonFolderHeroku(withFolder, callback) {
  var commonPath = path.join(withFolder, '../common');
  var modulesFolder = path.join(withFolder, 'node_modules/@este');
  var destFolder = path.join(withFolder, 'node_modules/@este/common')

  try {
    fs.mkdirpSync(destFolder);
    fs.copySync(commonPath, destFolder);
  } catch(err) {
    callback(err);
  }

  spawn('npm install', {
    cwd: destFolder
  }, callback);
}

function _linkCommonFolder(withFolder, callback) {
  var commonPath = path.join(withFolder, '../common');
  var options = {
    cwd: withFolder
  };
  spawn('npm link ' + commonPath, options, callback);
}
