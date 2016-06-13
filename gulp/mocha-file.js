import args from './support/args';
import gulp from 'gulp';
import mochaRunCreator from '../test/mochaRunCreator';
import path from 'path';

gulp.task('mocha-file', () => {
  // Example: gulp mocha-file --file src/common/todos/__test__/actions.js
  mochaRunCreator('exit')({ path: path.join(__dirname, `../${args.file}`) });
});
