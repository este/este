import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('deploy-firebase-database', (cb) => {
  childProcess
    .spawn('firebase', ['deploy', '--only', 'database'], { stdio: 'inherit' })
    .on('close', cb);
});
