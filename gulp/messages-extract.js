import fs from 'fs';
import gulp from 'gulp';

gulp.task('messages-extract', () => {
  const through = require('through2');
  const babel = require('babel-core');
  const messages = [];

  const getReactIntlMessages = code => babel.transform(code, {
    plugins: ['react-intl'],
    presets: ['es2015', 'react', 'stage-1']
  }).metadata['react-intl'].messages;

  return gulp.src([
    'src/**/*.js'
  ])
  .pipe(through.obj((file, enc, cb) => {
    const code = file.contents.toString();
    messages.push(...getReactIntlMessages(code));
    cb(null, file);
  }))
  .on('end', () => {
    messages.sort((a, b) => a.id.localeCompare(b.id));
    const eslint = '/* eslint-disable max-len, quote-props, quotes */';
    const json = JSON.stringify(messages, null, 2);
    // ES6 allows us to use multiline strings and eslint.
    const es6code = `${eslint}\nexport default ${json};\n`;
    fs.writeFile('messages/_default.js', es6code);
  });
});
