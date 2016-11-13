import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('jest', (done) => {
  childProcess
    .spawn('npm', ['run', 'jest'], { stdio: 'inherit' })
    .on('close', done);
});
