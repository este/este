import { Record } from '../transit';

const InitialState = Record({
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
}, 'device');

export default function deviceReducer(state = new InitialState) {
  return state;
}
