import bg from 'gulp-bg';
import gulp from 'gulp';
import path from 'path';
import fs from 'fs';

// because fs.existsSync is deprecated
const existsSync = (fname) => {
  try {
    fs.statSync(fname);
    return true;
  } catch (e) {
    return false;
  }
};

gulp.task(
  'server-nodemon',
  (cb) => {
    // windows uses nodemon.cmd
    const nodemonPaths = ['node_modules/.bin/nodemon.cmd', 'node_modules/.bin/nodemon']
      .map((npath) => path.normalize(npath));
    const npath = nodemonPaths.find(existsSync);
    if (npath == null) {
      throw new Error(`cannot find nodemon executable; tried: ${nodemonPaths}`);
    }
    bg(
      npath,
      '--ignore',
      'webpack-assets.json',
      path.normalize('src/server')
    )(cb);
  }
);
