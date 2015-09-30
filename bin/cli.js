#!/usr/bin/env node

// Deps
var chain = require('slide').chain;
var path = require('path');
var ln = require('linklocal');
var exec = require('./exec');
var program = require('commander');

// Paths
var webPath = path.join(__dirname, '../web');
var nativePath = path.join(__dirname, '../native');
var commonPath = path.join(__dirname, '../common');

function noop() {}

/**
 * Steps:
 * 1. cd ./common && npm install
 * 2. cd ./web && linklocal
 * 3. cd ./native && linklocal
 * 4. cd ./web && npm install
 * 5. cd ./native && npm install
 * 6. cd ./web && npm build
 */
program
  .command('postinstall')
  .description('Links packages and installs their dependencies')
  .action(function() {
    chain([
      [exec, 'npm install', commonPath],
      [exec, '../node_modules/.bin/linklocal', webPath],
      [exec, '../node_modules/.bin/linklocal', nativePath],
      [exec, 'npm install', webPath],
      [exec, 'npm install', nativePath],
      [exec, 'npm run build', webPath]
    ], noop)
  });

program
  .command('start')
  .action(function postInstall() {
    console.log('Use web-start to start web server instead');
  });

/**
 * Steps:
 * 1. cd ./web && npm start
 */
program
  .command('web-start')
  .description('Starts web server')
  .action(function postInstall() {
    exec('npm start', webPath);
  });

/**
 * Steps:
 * 1. cd ./web && npm run start-dev
 */
program
  .command('web-start-dev')
  .description('Starts web server')
  .action(function() {
    exec('npm run start-dev', webPath);
  });

/**
 * Steps:
 * 1. cd ./web && npm run build
 */
program
  .command('web-build')
  .description('Starts web server')
  .action(function() {
    exec('npm run build', webPath);
  });

/**
 * Steps:
 * 1. cd ./web && npm test
 */
program
  .command('test')
  .description('Starts web server')
  .action(function() {
    exec('npm test', webPath);
  });

program.parse(process.argv)
