import fs from 'fs';
import gulp from 'gulp';

// Native can't run Node code, so we need gulp task to pre-write initialState.
gulp.task('native', ['env'], done => {
  const initialState = require('../src/server/frontend/createInitialState')();
  fs.writeFile('src/native/initialState.js',
`/* eslint-disable eol-last, max-len, quotes, quote-props */
export default ${
  JSON.stringify(initialState, null, 2)
};`);
  done();
});
