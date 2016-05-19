import gulp from 'gulp';
import runSequence from 'run-sequence';

// Various fixes for react-native issues.
gulp.task('fix-react-native', done => {
  runSequence('fix-native-babelrc-files', done);
});
