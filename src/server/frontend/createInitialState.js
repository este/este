/* @flow */
import config from '../config';
import configReducer from '../../common/config/reducer';
import deviceReducer from '../../common/device/reducer';
import intlReducer from '../../common/intl/reducer';
import loadMessages from '../intl/loadMessages';

const messages = loadMessages();

const createInitialState = () => ({
  config: {
    ...configReducer(),
    appName: config.appName,
    appVersion: config.appVersion,
    firebase: config.firebase,
    sentryUrl: config.sentryUrl,
  },
  device: deviceReducer(),
  intl: {
    ...intlReducer(),
    currentLocale: config.defaultLocale,
    defaultLocale: config.defaultLocale,
    locales: config.locales,
    messages,
  },
});

export default createInitialState;
