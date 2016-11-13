import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('favicon', (done) => {
  runSequence('favicon-clean', 'favicon-generate', 'favicon-inject', done);
});
