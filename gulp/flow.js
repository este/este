import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('flow', done => {
  childProcess
    .spawn('npm', ['run', 'flow'], { stdio: 'inherit' })
    .on('close', done);
});
