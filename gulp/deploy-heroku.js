import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('deploy-heroku', done => {
  runSequence('deploy-heroku-git', 'deploy-firebase-database', done);
});
