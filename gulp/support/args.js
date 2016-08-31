import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .alias('f', 'front')
  .argv;

export default args;
