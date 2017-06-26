// @flow
const glob = require('glob');
const { DEFAULT_LOCALE } = require('../env-config');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// TODO: Show missing translations and optionally delete unused.

const defaultMessages = glob
  .sync('./lang/.messages/**/*.json')
  .map(filename => readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((messages, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (messages.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      messages[id] = defaultMessage;
    });
    return messages;
  }, {});

writeFileSync(
  `./lang/${DEFAULT_LOCALE}.json`,
  JSON.stringify(defaultMessages, null, 2),
);
console.log(
  `> Wrote default messages to: "${resolve(`./lang/${DEFAULT_LOCALE}.json`)}"`,
);
