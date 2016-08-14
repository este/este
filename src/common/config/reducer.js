import { Record } from '../transit';

const State = Record({
  appName: '',
  appVersion: '',
  firebase: '',
  sentryUrl: '',
}, 'config');

export default function configReducer(state = new State) {
  return state;
}
