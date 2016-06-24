import bg from 'gulp-bg';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';

const existsSync = path => {
  try {
    fs.statSync(path);
    return true;
  } catch (e) {
    return false;
  }
};

gulp.task('server-nodemon', done => {
  const nodemonPaths = [
    'node_modules/.bin/nodemon.cmd', // Windows uses nodemon.cmd
    'node_modules/.bin/nodemon'
  ].map((nodemonPath) => path.normalize(nodemonPath));
  const nodemonPath = nodemonPaths.find(path => existsSync(path));
  if (nodemonPath == null) {
    throw new Error(`Cannot find nodemon executable; tried: ${nodemonPaths}`);
  }
  bg(
    nodemonPath,
    '--ignore',
    'webpack-assets.json',
    path.normalize('src/server')
  )(done);
});
