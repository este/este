import bg from 'gulp-bg';
import gulp from 'gulp';

gulp.task('android', ['native'], bg('react-native', 'run-android'));
