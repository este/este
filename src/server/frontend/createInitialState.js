import config from '../config';
import loadMessages from '../intl/loadMessages';

const messages = loadMessages();

export default function createInitialState() {
  return {
    config: {
      appName: config.appName,
      appVersion: config.appVersion,
      firebaseUrl: config.firebaseUrl,
      sentryUrl: config.sentryUrl
    },
    intl: {
      currentLocale: config.defaultLocale,
      defaultLocale: config.defaultLocale,
      locales: config.locales,
      messages
    }
  };
}
