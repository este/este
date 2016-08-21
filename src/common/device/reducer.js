/* @flow weak */
import { Record } from '../transit';

const State = Record({
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
}, 'device');

const deviceReducer = (state = new State()) => state;

export default deviceReducer;
