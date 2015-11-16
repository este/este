/* eslint-disable no-undef */

import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';

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
        const parts = file.path.split('/');
        const filename = parts.pop(1);
        const dir = parts.join('/');
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
