import gulp from 'gulp';
import del from 'del';

// github.com/facebook/react-native/issues/4062#issuecomment-164598155
// Tested with the React Native 0.30
gulp.task('native-fix', async () => {
  await del(['node_modules/**/.babelrc', '!node_modules/react-native/**']);
});
