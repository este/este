// @flow
import args from './support/args';
import gulp from 'gulp';
import { execSync } from 'child_process';

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
  // Este uses appVersion also for crash reporting.
  const herokuGitIsAvailable = !process.env.SOURCE_VERSION;
  if (!process.env.appVersion && herokuGitIsAvailable) {
    process.env.appVersion = execSync('git rev-parse HEAD').toString().trim();
  }
});
