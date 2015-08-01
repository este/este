import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import makeWebpackConfig from './webpack/makeconfig';
import path from 'path';
import runSequence from 'run-sequence';
import webpackBuild from './webpack/build';
import webpackDevServer from './webpack/devserver';
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

gulp.task('env', () => {
  const env = args.production ? 'production' : 'development';
  process.env.NODE_ENV = env; // eslint-disable-line no-undef
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production
  ? 'build-webpack-production'
  : 'build-webpack-dev'
]);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js',
    '!**/__tests__/*.*'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('karma-ci', (done) => {
  runKarma({singleRun: true}, done);
});

gulp.task('karma-dev', (done) => {
  runKarma({singleRun: false}, done);
});

gulp.task('test', (done) => {
  runSequence('eslint', 'karma-ci', 'build-webpack-production', done);
});

gulp.task('server', ['env', 'build'], bg('node', 'src/server'));

// Run karma configured for TDD.
gulp.task('tdd', (done) => {
  runSequence('server', 'karma-dev', done);
});

gulp.task('default', ['server']);
