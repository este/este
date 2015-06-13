/* eslint-env node */

'use strict';

var bg = require('gulp-bg');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var makeWebpackConfig = require('./webpack/makeconfig');
var runSequence = require('run-sequence');
var webpackBuild = require('./webpack/build');
var webpackDevServer = require('./webpack/devserver');
var karma = require('karma').server;
var yargs = require('yargs');

var args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
  process.env.CONTINUOUS_INTEGRATION = !!process.env.CIRCLECI
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production ? 'build-webpack-production' : 'build-webpack-dev']);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', function() {
  return gulp.src([
      'gulpfile.js',
      'src/**/*.js',
      'webpack/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('karma', function(done) {
  karma.start({
    configFile: require('path').join(__dirname, 'karma.conf.js')
  }, done);
});

gulp.task('test', function(done) {
  // Run test tasks serially, because it doesn't make sense to build when tests
  // are not passing, and it doesn't make sense to run tests, if lint has failed.
  // Gulp deps aren't helpful, because we want to run tasks without deps as well.
  runSequence('eslint', 'karma', 'build-webpack-production', done);
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

gulp.task('default', ['server']);
