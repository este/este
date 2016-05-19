import childProcess from 'child_process';
import gulp from 'gulp';

// An example of deploy to Firebase static hosting.
gulp.task('deploy', ['to-html'], (cb) => {
  // I don't know any better way how to run a simple shell task:
  // http://stackoverflow.com/questions/37187069/how-to-easily-run-system-shell-task-command-in-gulp
  childProcess.spawn('firebase', ['deploy'], { stdio: 'inherit' }).on('close', cb);
});
