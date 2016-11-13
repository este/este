import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('deploy-firebase', ['to-html'], (done) => {
  childProcess
    .spawn('firebase', ['deploy'], { stdio: 'inherit' })
    .on('close', done);
});
