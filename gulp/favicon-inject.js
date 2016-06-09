import fs from 'fs';
import gulp from 'gulp';
import { injectFavicon } from './support/favicon/favicon';

gulp.task('favicon-inject', () => {
  const content = `/* eslint-disable quote-props, quotes */
export default ${JSON.stringify(injectFavicon(), null, 2)};
`;
  fs.writeFileSync('./src/common/app/favicon.js', content);
});
