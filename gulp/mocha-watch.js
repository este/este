import gulp from 'gulp';
import mochaRunCreator from '../test/mochaRunCreator';

gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRunCreator('log')
  );
});
