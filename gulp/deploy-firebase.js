import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('deploy-firebase', ['to-html'], (cb) => {
  childProcess
    .spawn('firebase', ['deploy'], { stdio: 'inherit' })
    .on('close', cb);
});
