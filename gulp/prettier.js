// @flow
import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('prettier', done => {
  childProcess
    .spawn('npm', ['run', 'prettier'], { stdio: 'inherit' })
    .on('close', done);
});
