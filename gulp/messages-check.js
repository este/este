/* eslint-disable no-console */
import gulp from 'gulp';

gulp.task('messages-check', () => {
  const loadMessages = require('../src/server/intl/loadMessages');
  const messages = loadMessages({ includeDefault: true });
  const defaultMessagesKeys = Object.keys(messages._default);

  const diff = (a, b) => a.filter(item => b.indexOf(item) === -1);
  const log = (what, messagesKeys) => {
    if (!messagesKeys.length) return;
    console.log(`  ${what}`);
    messagesKeys.forEach(messageKey => console.log(`    ${messageKey}`));
  };

  Object.keys(messages)
    .filter(key => key !== '_default')
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
