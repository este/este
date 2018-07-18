// @flow
// https://github.com/motdotla/dotenv
import fs from 'fs';

if (fs.existsSync('.env') === false) {
  throw new Error('Missing .env file. Run "yarn env dev" to make one.');
}

// `yarn babel web` will copy `.babelrc.web` file to `.babelrc` file.
const name = process.argv[process.argv.length - 1];

fs.copyFileSync(`.babelrc.${name}`, '.babelrc');
