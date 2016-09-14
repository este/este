/* Package used to counteract https://github.com/este/este/issues/1134 */
import spawn from 'cross-spawn';
import gulp from 'gulp';

gulp.task('deploy-firebase', ['to-html'], done => {
  spawn('firebase', ['deploy'], { stdio: 'inherit' })
  .on('close', done);
});
