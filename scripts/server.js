const childProcess = require('child_process');
const exec = childProcess.exec;
const spawn = childProcess.spawn;

if ( process.env.NODE_ENV === 'production' ) {

  logger(spawn('npm', ['run', 'build']));
  logger(spawn('npm', ['run', 'server-node']));

} else {

  logger(spawn('npm', ['run', 'server-hot']));
  logger(spawn('npm', ['run', 'server-nodemon']));

}

function logger(proc){

  proc.stdout.on('data', printOut);
  proc.stderr.on('data', printOut);

}

function printOut(data) {
  console.log(data.toString('utf8'));  // eslint-disable-line no-console
}
