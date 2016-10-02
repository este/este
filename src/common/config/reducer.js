/* @flow weak */
import { Record } from '../transit';

const State = Record({
  appName: 'ChatX',
  appVersion: '0.0.2',
  firebase: 'ezfiuezh',
  sentryUrl: '',
}, 'config');

const configReducer = (state = new State()) => state;

export default configReducer;
