import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('deploy-heroku-git', cb => {
  childProcess
    .spawn('git', ['push', 'heroku', 'master'], { stdio: 'inherit' })
    .on('close', cb);
});
