import del from 'del';
import fs from 'fs';
import gulp from 'gulp';

// github.com/facebook/react-native/issues/4062#issuecomment-164598155
// This is a very long-term issue. Nobody can fix the whole NPM.
const fixBabel5RcFiles = () =>
  del(['node_modules/**/.babelrc', '!node_modules/react-native/**']);

// github.com/yahoo/react-intl/issues/620#issuecomment-242897276
// There is a chance react-intl team will fix it, but we can't wait.
const fixReactIntlLibraries = () => {
  [
    ['react-intl', './locale-data/index.js'],
    ['intl-messageformat', './lib/locales'],
    ['intl-relativeformat', './lib/locales'],
    ['intl', './locale-data/complete.js'],
  ].forEach(([packageName, fileToFix]) => {
    try {
      const path = `node_modules/${packageName}/package.json`;
      const file = fs.readFileSync(path, 'utf8');
      const json = {
        ...JSON.parse(file),
        'react-native': {
          [fileToFix]: fileToFix,
        },
      };
      const jsonString = JSON.stringify(json, null, 2);
      fs.writeFileSync(path, jsonString);
    } catch (e) {
      // If reading, parsing, or writing file fails, there's not much we can do.
      return;
    }
  });
};

gulp.task('native-fix', async () => {
  await fixBabel5RcFiles();
  fixReactIntlLibraries();
});
