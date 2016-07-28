import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('ava-watch', done => {
  childProcess
    .spawn('npm', ['run', 'ava:watch'], { stdio: 'inherit' })
    .on('close', done);
});
