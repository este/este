/* Package used to counteract https://github.com/este/este/issues/1134 */
import spawn from 'cross-spawn';
import gulp from 'gulp';

gulp.task('flow', done => {
  spawn('npm', ['run', 'flow'], { stdio: 'inherit' })
  .on('close', done);
});
