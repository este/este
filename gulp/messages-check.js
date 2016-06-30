/* eslint-disable no-console */
import gulp from 'gulp';
import { diff } from './support/messages';

gulp.task('messages-check', ['messages-extract'], () => {
  const loadMessages = require('../src/server/intl/loadMessages');
  const messages = loadMessages({ includeDefault: true });
  const defaultMessagesKeys = Object.keys(messages._default);

  const log = (what, messagesKeys) => {
    if (!messagesKeys.length) return;
    console.log(`  ${what}`);
    messagesKeys.forEach(messageKey => console.log(`    ${messageKey}`));
  };

  Object.keys(messages)
    .filter(locale => locale !== '_default')
    .forEach(locale => {
      const localeMessagesKeys = Object.keys(messages[locale]);
      const missingMessagesKeys = diff(defaultMessagesKeys, localeMessagesKeys);
      const unusedMessagesKeys = diff(localeMessagesKeys, defaultMessagesKeys);
      if (!missingMessagesKeys.length && !unusedMessagesKeys.length) return;
      console.log(locale);
      log('missing messages', missingMessagesKeys);
      log('unused messages', unusedMessagesKeys);
    });
});
