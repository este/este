import config from '../config';
import configReducer from '../../common/config/reducer';
import deviceReducer from '../../common/device/reducer';
import intlReducer from '../../common/intl/reducer';
import loadMessages from '../intl/loadMessages';

const messages = loadMessages();

export default function createInitialState() {
  return {
    config: configReducer(undefined, {})
      .set('appName', config.appName)
      .set('appVersion', config.appVersion)
      .set('firebase', config.firebase)
      .set('sentryUrl', config.sentryUrl),
    device: deviceReducer(undefined, {}),
    intl: intlReducer(undefined, {})
      .set('currentLocale', config.defaultLocale)
      .set('defaultLocale', config.defaultLocale)
      .set('locales', config.locales)
      .set('messages', messages),
  };
}
