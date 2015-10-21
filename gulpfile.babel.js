/* eslint-disable no-undef, no-console */
import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import os from 'os';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import webpackBuild from './webpack/build';
import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .argv;

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('test', done => {
  // TODO: Add tests.
  runSequence('eslint-ci', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
// Shell fixes Windows este/issues/522, bg is still needed for server-hot.
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon src/server')
));

gulp.task('server', ['env'], done => {
  if (args.production)
    runSequence('build', 'server-node', done);
  else
    runSequence('server-hot', 'server-nodemon', done);
});

gulp.task('default', ['server']);

// React Native

// Fix for custom .babelrc cache issue.
// https://github.com/facebook/react-native/issues/1924#issuecomment-120170512
gulp.task('clear-react-packager-cache', function() {
  // Clear react-packager cache
  const tempDir = os.tmpdir();

  const cacheFiles = fs.readdirSync(tempDir).filter(function(fileName) {
    return fileName.indexOf('react-packager-cache') === 0;
  });

  cacheFiles.forEach(function(cacheFile) {
    const cacheFilePath = path.join(tempDir, cacheFile);
    fs.unlinkSync(cacheFilePath);
    console.log('Deleted cache: ', cacheFilePath);
  });

  if (!cacheFiles.length) {
    console.log('No cache files found!');
  }
});
