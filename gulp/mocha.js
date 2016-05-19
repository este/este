import gulp from 'gulp';
import mochaRunCreator from '../test/mochaRunCreator';

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});
