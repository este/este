// @flow
const { execSync } = require('child_process');

execSync('now', {
  stdio: 'inherit',
});
