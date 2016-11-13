/* eslint-disable no-console */
import fs from 'fs';
import gulp from 'gulp';
import loadMessages from '../src/server/intl/loadMessages';
import { diff, messagesToCode } from './support/messages';

gulp.task('messages-clear', ['messages-extract'], () => {
  const messages = loadMessages({ includeDefault: true });
  const defaultMessagesKeys = Object
    .keys(messages._default); // eslint-disable-line no-underscore-dangle

  Object.keys(messages)
    .filter(locale => locale !== '_default')
    .forEach((locale) => {
      const localeMessagesKeys = Object.keys(messages[locale]);
      const unusedMessagesKeys = diff(localeMessagesKeys, defaultMessagesKeys);
      const clearedMessages = require(`../messages/${locale}`) // eslint-disable-line import/no-dynamic-require
        .default
        .filter(translation => unusedMessagesKeys.indexOf(translation.id) === -1);
      const code = messagesToCode(clearedMessages);
      console.log(locale);
      unusedMessagesKeys.forEach(messageKey => console.log(`  ${messageKey}`));
      fs.writeFile(`messages/${locale}.js`, code);
    });
});
