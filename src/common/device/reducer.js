/* @flow */
import type { DeviceState } from '../types';

const initialState = {
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
};

const reducer = (
  state: DeviceState = initialState,
): DeviceState => state;

export default reducer;
