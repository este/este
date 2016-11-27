import bg from 'gulp-bg';
import gulp from 'gulp';

// If this doesn't work, while manual Xcode works, try:
// 1) delete ios/build directory
// 2) reset content and settings in iOS simulator
gulp.task('ios', ['native'], bg(
  'react-native', 'run-ios', '--simulator', 'iPhone 5s',
));
