// @flow
// https://github.com/motdotla/dotenv
const fs = require('fs');

if (fs.existsSync('.env') === false) {
  throw new Error('Missing .env file. Run "yarn env dev" to make one.');
}

// `yarn babel web` will copy `.babelrc.web` file to `.babelrc` file.
const name = process.argv[process.argv.length - 1];

// $FlowFixMe Missing libdefs.
fs.copyFileSync(`.babelrc.${name}`, '.babelrc');
