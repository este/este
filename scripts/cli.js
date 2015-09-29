#!/usr/bin/env node

/**
 * Cross-platform wrapper for NPM scripts
 * If you don't care, shorthened equvialent for UNIX systems
 * is provided above each command
 */

var program = require('commander');
var preInstall = require('./preInstall');
var postInstall = require('./postInstall');

program.version('1.0.0-rc1');

program
  .command('preinstall')
  .description('Links packages for development or copies in Heroku environment')
  .action(preInstall);

program
  .command('postinstall')
  .description('Installs web & native dependencies. Skips native on Heroku')
  .action(postInstall);

program.parse(process.argv);
