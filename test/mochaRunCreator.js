/* eslint-disable no-undef */

// Because root .babelrc is configured for react-native (browser users webpack
// and server has own .babelrc file), we have to require regenerator explicitly.
import 'regenerator/runtime';

import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import path from 'path';

// To ignore webpack custom loaders on server.
['css', 'less', 'sass', 'scss', 'styl'].forEach(ext => {
  require.extensions['.' + ext] = () => {};
});

function reportError(errorReporter) {
  return errorReporter === 'process' ? process.exit.bind(process, 1) : gutil.log;
}

export default function mochaRunCreator(errorReporter = 'process') {
  return (file) => {
    let source = 'src/**/__test__/**/*.js';

    if (file) {
      // Do not run tests when changed something not JS
      if (!/\.(js|jsx)?$/.test(file.path)) {
        console.log(`Change happend on '${file.path}' but it is not valid JS file`); // eslint-disable-line no-console
        return null;
      }

      if (file.path.indexOf('__test__') !== -1)
        source = file.path;
      else {
        const parts = file.path.split(path.sep);
        const filename = parts.pop(1);
        const dir = parts.join(path.sep);
        source = `${dir}/__test__/${filename.split('.')[0]}*.js`;
      }
    }

    console.log(`Running ${source}`); // eslint-disable-line no-console
    gulp.src(source, {read: false})
      .pipe(mocha({
        require: ['./test/mochaSetup.js'],
        reporter: 'spec'
      }))
      .on('error', reportError(errorReporter));
  };
}
