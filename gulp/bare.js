/* eslint-disable no-console */
import gulp from 'gulp';

gulp.task('bare', () => {
  console.log(`
    Steps to make bare Este app.

    How to remove one app feature, todos for example
      - remove src/browser/todos, src/common/todos, src/native/todos dirs
      - remove todos reducer from src/common/app/reducer.js
      - remove todos routes from src/browser/createRoutes.js
      - remove link from src/browser/app/Header.react.js

    Files need to be updated for fresh new Este app
      - package.json, set app name
      - src/server/config.js
      - src/{browser, native}/main.js, import only needed locale-data
      - src/{browser, native}/createRoutes.js
      - src/{browser, native}/app/*.*
      - Unused code should be deleted as well. TODO: Make a gulp task for it.

    Yeah, it's that easy.
  `);
});
