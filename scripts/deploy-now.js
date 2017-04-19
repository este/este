// @flow
const { execSync } = require('child_process');

// We need script to get commitSha for app/version.

let commitSha = 'dev';

try {
  commitSha = execSync('git rev-parse HEAD').toString().trim();
} catch (e) {
  console.log('Git CMD tool is required to get current commit SHA.');
  console.log('Commit SHA (app/version) is used for error reporting.');
}

execSync(`now --env APP_VERSION="${commitSha}"`, {
  stdio: 'inherit',
});
