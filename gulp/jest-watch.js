import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('jest-watch', (done) => {
  childProcess
    .spawn('npm', ['run', 'jest:watch'], { stdio: 'inherit' })
    .on('close', done);
});
