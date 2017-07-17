// @flow
const glob = require('glob');
const { DEFAULT_LOCALE } = require('../env-config');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// TODO: Detect missing and unused translations. PR please.

const defaultMessages = glob
  .sync('./lang/.messages/**/*.json')
  .map(filename => readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce(
    (descriptors, fileDescriptors) => [...descriptors, ...fileDescriptors],
    [],
  )
  .sort((a, b) => a.id.localeCompare(b.id))
  .reduce((messages, descriptor) => {
    if (messages.hasOwnProperty(descriptor.id)) {
      throw new Error(`Duplicate message id: ${descriptor.id}`);
    }
    messages[descriptor.id] = descriptor.defaultMessage;
    return messages;
  }, {});

writeFileSync(
  `./lang/${DEFAULT_LOCALE}.json`,
  JSON.stringify(defaultMessages, null, 2),
);
console.log(
  `> Wrote default messages to: "${resolve(`./lang/${DEFAULT_LOCALE}.json`)}"`,
);
