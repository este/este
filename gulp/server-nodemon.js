import bg from 'gulp-bg';
import gulp from 'gulp';
import path from 'path';

gulp.task(
  'server-nodemon',
  bg(
    path.normalize('node_modules/.bin/nodemon'),
    '--ignore',
    'webpack-assets.json',
    path.normalize('src/server')
  )
);
