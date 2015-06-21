/* eslint-env node */

'use strict';

var bg = require('gulp-bg');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var karma = require('karma').server;
var makeWebpackConfig = require('./webpack/makeconfig');
var path = require('path');
var runSequence = require('run-sequence');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var yargs = require('yargs');

var args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production ? 'build-webpack-production' : 'build-webpack-dev']);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', function() {
  return gulp.src([
    'gulpfile.js',
    'src/**/*.js',
    'webpack/*.js',
    '!**/__tests__/*.*'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

function runKarma(config, done) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: config.singleRun
  }, done);
}

gulp.task('karma-ci', function(done) {
  runKarma({singleRun: true}, done);
});

gulp.task('karma-dev', function(done) {
  runKarma({singleRun: false}, done);
});

gulp.task('test', function(done) {
  // Run test tasks serially, because it doesn't make sense to build when tests
  // are not passing, and it doesn't make sense to run tests, if lint has failed.
  // Gulp deps aren't helpful, because we want to run tasks without deps as well.
  runSequence('eslint', 'karma-ci', 'build-webpack-production', done);
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

gulp.task('default', ['server', 'karma-dev']);
