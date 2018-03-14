// @flow
// https://github.com/motdotla/dotenv
const fs = require('fs');

// `yarn babel web` will copy `.babelrc.web` file to `.babelrc` file.
const name = process.argv[process.argv.length - 1];

// $FlowFixMe Missing libdefs.
fs.copyFileSync(`.babelrc.${name}`, '.babelrc');
