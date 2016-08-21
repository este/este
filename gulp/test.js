import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', done => {
  runSequence('eslint-ci', 'ava', 'flow', 'build-webpack', done);
});
