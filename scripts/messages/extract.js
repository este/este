// @flow
const glob = require('glob');
const fs = require('fs');
const { defaultLocale } = require('../../server/constants');
const { resolve } = require('path');

const defaultMessages = glob
  // Remember babel plugin generates only required / imported components.
  // That's why application has to be built before extraction.
  .sync('./lang/.messages/**/*.json')
  .map(filename => fs.readFileSync(filename, 'utf8'))
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

fs.writeFileSync(
  `./lang/${defaultLocale}.json`,
  JSON.stringify(defaultMessages, null, 2),
);

console.log(
  `Wrote default messages to: "${resolve(`./lang/${defaultLocale}.json`)}"`,
);
