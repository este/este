import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', (done) => {
  runSequence('eslint-ci', 'jest', 'flow', 'build-webpack', done);
});
