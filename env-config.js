// @flow
const { execSync } = require('child_process');
const { name: appName } = require('./package.json');

// github.com/FormidableLabs/babel-plugin-transform-define
// Note this file is cached in node-modules dir.

const production = process.env.NODE_ENV === 'production';
let commitSha = '';

try {
  commitSha = execSync('git rev-parse HEAD').toString().trim();
} catch (e) {
  console.log('Git CMD tool is required to get current commit SHA.');
  console.log('Commit SHA is used for app/version.');
}

module.exports = {
  APP_NAME: appName,
  APP_VERSION: commitSha,
  BACKEND_URL: production
    ? 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv'
    : 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv',
};
