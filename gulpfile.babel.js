import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./gulp', { recurse: false });

// Default task to start development. Just type `gulp`.
gulp.task('default', ['server']);
