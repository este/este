import gulp from 'gulp';
import path from 'path';
import shell from 'gulp-shell';

gulp.task(
  'server-nodemon',
  shell.task(
    path.normalize('node_modules/.bin/nodemon --ignore webpack-assets.json src/js/server')
  )
);
