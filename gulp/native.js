import fs from 'fs';
import gulp from 'gulp';
import { toJSON } from '../src/common/transit';

// Native can't run Node code, so we need gulp task to pre-write initialState.
gulp.task('native', ['env'], done => {
  const state = require('../src/server/frontend/createInitialState')();

  const file = `/* eslint-disable quotes, comma-spacing, max-len */
// Export locales because native/index polyfill runs before transit.
export const locales = ${JSON.stringify(state.intl.locales)};
export const initialTransitState = ${JSON.stringify(toJSON(state))};
`;
  fs.writeFileSync('src/native/initialState.js', file);
  done();
});
