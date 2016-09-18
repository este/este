import spawn from 'cross-spawn';
import gulp from 'gulp';

gulp.task('flow', done => {
  spawn('npm', ['run', 'flow'], { stdio: 'inherit' })
  .on('close', done);
});
