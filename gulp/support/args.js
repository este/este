import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .argv;

export default args;
