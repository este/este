import gulp from 'gulp';
import runEslint from './support/run-eslint';

gulp.task('eslint', () => runEslint());
