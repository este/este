import fs from 'fs';
import gulp from 'gulp';

// Native can't run Node code, so we need gulp task to pre-write initialState.
gulp.task('native', ['env'], (done) => {
  const createInitialState = require('../src/server/frontend/createInitialState').default;

  const initialState = createInitialState();
  const string = JSON.stringify(initialState, null, 2);

  const file = `/* eslint-disable quotes, quote-props, comma-dangle, max-len */
export default ${string};
`;
  fs.writeFileSync('src/native/initialState.js', file);
  done();
});
