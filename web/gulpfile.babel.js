import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import runSequence from 'run-sequence';
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

gulp.task('test', (done) => {
  runSequence('eslint-ci', 'build-webpack', done);
});

gulp.task('server-hot', bg('node', './webpack/server'));

gulp.task('server', ['env', 'build', 'server-hot'], bg('nodemon', './src/server'));

gulp.task('default', ['server']);
