/* eslint-disable no-undef */

import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';

function reportError(errorReporter) {
  return errorReporter === 'process' ? process.exit.bind(process, 1) : gutil.log
}

export default function mochaRunCreator(errorReporter = 'process') {
  return () => {
    // read: false, not to load file contents
    gulp.src('src/**/__test__/**/*.js', {read: false})
      .pipe(mocha({
        require: ['./test/mochaSetup.js'],
        reporter: 'spec'
      }))
      .on('error', reportError(errorReporter));
  }
}
