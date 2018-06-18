// @flow
import { defaultLocale } from '../../lib/constants';
import fs from 'fs';
import glob from 'glob';

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf8'));

const defaultLocaleKeys = Object.keys(readJson(`./lang/${defaultLocale}.json`));

glob
  .sync('./lang/*.json')
  .filter(path => path.indexOf(`${defaultLocale}.`) === -1)
  .forEach(path => {
    const json = readJson(path);
    const cleaned = {};
    Object.keys(json).forEach(key => {
      if (!defaultLocaleKeys.includes(key)) return;
      cleaned[key] = json[key];
    });
    fs.writeFileSync(path, JSON.stringify(cleaned, null, 2));
  });

// eslint-disable-next-line no-console
console.log('Messages cleaned');
