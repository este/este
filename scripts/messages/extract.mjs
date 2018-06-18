// @flow
import glob from 'glob';
import fs from 'fs';
import { defaultLocale } from '../../lib/constants';

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
    // eslint-disable-next-line no-prototype-builtins
    if (messages.hasOwnProperty(descriptor.id)) {
      throw new Error(`Duplicate message id: ${descriptor.id}`);
    }
    // eslint-disable-next-line no-param-reassign
    messages[descriptor.id] = descriptor.defaultMessage;
    return messages;
  }, {});

fs.writeFileSync(
  `./lang/${defaultLocale}.json`,
  JSON.stringify(defaultMessages, null, 2),
);

// eslint-disable-next-line no-console
console.log(`Wrote default messages to: "${`./lang/${defaultLocale}.json`}"`);
