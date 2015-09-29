#!/usr/bin/env node

/**
 * Cross-platform wrapper for NPM scripts
 * If you don't care, shorthened equvialent for UNIX systems
 * is provided above each command
 */

var program = require('commander');
var path = require('path');
var preInstall = require('./preInstall');
var postInstall = require('./postInstall');
var spawnInFolder = require('./utils').spawnInFolder;
var webPath = path.join(process.cwd(), './web');
var nativePath = path.join(process.cwd(), './web');

program.version('1.0.0-rc1');

program
  .command('preinstall')
  .description('Links packages for development or copies in Heroku environment')
  .action(preInstall);

program
  .command('postinstall')
  .description('Installs web & native dependencies. Skips native on Heroku')
  .action(postInstall);

program
  .command('web-start')
  .description('Starts web server')
  .action(function executeWebStart() {
    spawnInFolder('npm start', webPath);
  });

program
  .command('web-start-dev')
  .description('Starts development server')
  .action(function executeWebStartDev() {
    spawnInFolder('npm run start-dev', webPath);
  });

program
  .command('web-build')
  .description('Builds package')
  .action(function executeWebBuild() {
    spawnInFolder('npm run build', webPath);
  });

program
  .command('test')
  .description('Tests packages')
  .action(function executeTest() {
    spawnInFolder('npm test', webPath);
  });

program.parse(process.argv);
