/* eslint-disable no-undef, no-console */
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import mochaRunCreator from './test/mochaRunCreator';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import webpackBuild from './webpack/build';
import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .argv;

// To fix some eslint issues: gulp eslint --fix
const runEslint = () => {
  const isFixed = file => args.fix && file.eslint && file.eslint.fixed;
  return gulp.src([
    'gulpfile.babel.js',
    'messages/*.js',
    'src/**/*.js',
    'webpack/*.js'
  ], { base: './' })
    .pipe(eslint({ fix: args.fix }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
};

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('clean', () => del('build/*'));

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => runEslint());
gulp.task('eslint-ci', () => runEslint().pipe(eslint.failAfterError()));

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});
gulp.task('mocha-file', () => {
  // Example: gulp mocha-file --file src/browser/components/__test__/Button.js
  mochaRunCreator('process')({ path: path.join(__dirname, args.file) });
});
gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRunCreator('log')
  );
});

gulp.task('test', done => {
  runSequence('eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
// Shell fixes Windows este/issues/522, bg is still needed for server-hot.
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon --ignore webpack-assets.json src/server')
));
gulp.task('server', ['env'], done => {
  if (args.production) {
    runSequence('clean', 'build', 'server-node', done);
  } else {
    runSequence('server-hot', 'server-nodemon', done);
  }
});

// Default task to start development. Just type gulp.
gulp.task('default', ['server']);

// Prerender app to HTML files. Useful for static hostings like Firebase.
// Test (OSX): cd build && python -m SimpleHTTPServer 8000
gulp.task('to-html', done => {
  args.production = true;
  process.env.IS_SERVERLESS = true;

  const urls = {
    '/': 'index.html',
    '/404': '404.html'
  };

  const fetch = url => new Promise((resolve, reject) => {
    require('http').get({ host: 'localhost', path: url, port: 8000 }, res => {
      // Explicitly treat incoming data as utf8 (avoids issues with multi-byte).
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });

  const moveAssets = () => {
    const assets = fs.readdirSync('build');
    fs.mkdirSync(path.join('build', 'assets'));
    assets.forEach(fileName => {
      fs.renameSync(
        path.join('build', fileName),
        path.join('build', 'assets', fileName)
      );
    });
  };

  const toHtml = () => {
    const promises = Object.keys(urls).map(url => fetch(url).then(html => {
      fs.writeFile(path.join('build', urls[url]), html);
    }));
    return Promise.all(promises);
  };

  runSequence('eslint-ci', 'mocha', 'clean', 'build', () => {
    const proc = require('child_process').spawn('node', ['./src/server']);
    proc.stderr.on('data', data => console.log(data.toString()));
    proc.stdout.on('data', async data => {
      data = data.toString();
      if (data.indexOf('Server started') === -1) return;
      try {
        moveAssets();
        await toHtml();
      } catch (error) {
        console.log(error);
      } finally {
        proc.kill();
        done();
        console.log('App has been rendered to /build directory.');
      }
    });
  });
});

// React Native

gulp.task('native', done => {
  const config = require('./src/server/config');
  const { appName, defaultLocale, firebaseUrl, locales } = config;
  const messages = require('./src/server/intl/loadMessages')();
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

// If this doesn't work, while manual Xcode works, try:
// 1) delete ios/build directory
// 2) reset content and settings in iOS simulator
gulp.task('ios', ['native'], bg('react-native', 'run-ios'));
gulp.task('android', ['native'], bg('react-native', 'run-android'));

// Various fixes for react-native issues.
gulp.task('fix-react-native', done => {
  runSequence('fix-native-babelrc-files', done);
});

// https://github.com/facebook/react-native/issues/4062#issuecomment-164598155
// Still broken in RN 0.23.1
gulp.task('fix-native-babelrc-files', () =>
  del(['node_modules/**/.babelrc', '!node_modules/react-native/**'])
);

gulp.task('bare', () => {
  console.log(`
    Steps to make bare Este app. Yes, you have to it manually for now.

    Remove app todos (or other app features)
      - remove /src/browser/todos, /src/common/todos, /src/native/todos dirs
      - remove todos reducer from /src/common/app/reducer.js
      - remove todos routes from /src/browser/createRoutes.js
      - remove link from /src/browser/app/Header.react.js

    Customize app
      - set defaultLocale and locales in src/server/config.js
      - import only used locale-data in src/browser/main.js
      - set app name in package.json

    Yeah, it's that easy.
  `);
});

// An example of deploy to Firebase static hosting.
gulp.task('deploy', ['to-html'], shell.task([
  'firebase deploy'
]));

gulp.task('extractDefaultMessages', () => {
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
