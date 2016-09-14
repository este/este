import spawn from 'cross-spawn';
import gulp from 'gulp';

gulp.task('ava', done => {
  spawn('npm', ['run', 'ava'], { stdio: 'inherit' })
  .on('close', done);
});
