// @flow
const { defaultLocale } = require('../../server/constants');
const fs = require('fs');
const glob = require('glob');

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf8'));

const defaultLocaleKeys = Object.keys(readJson(`./lang/${defaultLocale}.json`));

glob
  .sync('./lang/*.json')
  .filter(path => path.indexOf(`${defaultLocale}.`) === -1)
  .forEach(path => {
    const json = readJson(path);
    const missing = [];
    defaultLocaleKeys.forEach(key => {
      // eslint-disable-next-line no-prototype-builtins
      if (json.hasOwnProperty(key)) return;
      missing.push(key);
    });
    if (missing.length === 0) return;
    throw new Error(`Missing messages in ${path}: ${missing.join(', ')}`);
  });

// eslint-disable-next-line no-console
console.log('No messages are missing');
