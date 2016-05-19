import fs from 'fs';
import gulp from 'gulp';

gulp.task('native', done => {
  const config = require('../src/server/config');
  const { appName, defaultLocale, firebaseUrl, locales } = config;
  const messages = require('../src/server/intl/loadMessages')();
  fs.writeFile('src/native/config.js',
`/* eslint-disable eol-last, quotes, quote-props */
export default ${
  JSON.stringify({ appName, defaultLocale, firebaseUrl, locales }, null, 2)
};`);
  fs.writeFile('src/native/messages.js',
`/* eslint-disable eol-last, max-len, quotes, quote-props */
export default ${
  JSON.stringify(messages, null, 2)
};`);
  done();
});
