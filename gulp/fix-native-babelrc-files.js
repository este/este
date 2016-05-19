import del from 'del';
import gulp from 'gulp';

// https://github.com/facebook/react-native/issues/4062#issuecomment-164598155
// Still broken in RN 0.23.1
gulp.task('fix-native-babelrc-files', () =>
  del(['node_modules/**/.babelrc', '!node_modules/react-native/**'])
);
