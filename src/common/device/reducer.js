import { Record } from '../transit';

const State = Record({
  host: '',
  isReactNative: false,
  platform: '', // iOS or Android in React Native.
}, 'device');

export default function deviceReducer(state = new State) {
  return state;
}
