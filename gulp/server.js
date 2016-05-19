import args from './support/args';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('server', ['env'], done => {
  if (args.production) {
    runSequence('clean', 'build', 'server-node', done);
  } else {
    runSequence('server-hot', 'server-nodemon', done);
  }
});
