/* @flow */
import config from '../config';
import configReducer from '../../common/config/reducer';
import deviceReducer from '../../common/device/reducer';

const createInitialState = () => ({
  config: configReducer(undefined, {})
    .set('appName', config.appName)
    .set('appVersion', config.appVersion)
    .set('firebase', config.firebase)
    .set('sentryUrl', config.sentryUrl),
  device: deviceReducer(undefined, {}),
});

export default createInitialState;
