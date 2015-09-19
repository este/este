import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import webpackBuild from './webpack/build';
import yargs from 'yargs';
import {Server as KarmaServer} from 'karma';

const args = yargs
  .alias('p', 'production')
  .argv;

const runKarma = ({singleRun}, done) => {
  const server = new KarmaServer({
    configFile: path.join(__dirname, 'karma.conf.js'), // eslint-disable-line no-undef
    singleRun: singleRun
  }, done);
  server.start();
};

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
    // '!**/__tests__/*.*'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

gulp.task('env', () => {
  const env = args.production ? 'production' : 'development';
  process.env.NODE_ENV = env; // eslint-disable-line no-undef
});

gulp.task('build-webpack', webpackBuild);
gulp.task('build', args.production ? ['build-webpack'] : []);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('karma-ci', (done) => {
  runKarma({singleRun: true}, done);
});

gulp.task('karma', (done) => {
  runKarma({singleRun: false}, done);
});

gulp.task('test', (done) => {
  // TODO: Fix 'karma-ci'
  runSequence('eslint-ci', 'build-webpack', done);
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

gulp.task('tdd', (done) => {
  // Run karma configured for TDD.
  runSequence('server', 'karma', done);
});

gulp.task('default', ['server']);
