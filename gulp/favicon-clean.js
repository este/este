import del from 'del';
import gulp from 'gulp';

gulp.task('favicon-clean', () => del('src/common/app/favicons/*.*'));
