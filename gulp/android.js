import bg from 'gulp-bg';
import gulp from 'gulp';

gulp.task('android', ['native'], bg(
  'node', 'node_modules/react-native/local-cli/cli.js',
  'run-android',
));
