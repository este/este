// @flow
import type { State, Store } from '../types';
import {
  createTransform,
  persistStore as reduxPersistStore,
} from 'redux-persist';
import { pick } from 'ramda';

// TODO: Add redux-persist-migrate.

type Feature = $Keys<State>;
type FeatureProps = ?Array<string>; // TODO: Infere if possible.
type Paths = Array<[Feature, FeatureProps]>;

const paths: Paths = [
  ['config', ['baselineShown', 'darkEnabled']],
  ['users', null],
];

const transforms = [];
const whitelist: Array<string> = [];

// Paths always override the initialState, because upcoming service workers.
// Paths are explicit, because upcoming migration.
paths.forEach(([feature, props]) => {
  whitelist.push(feature);
  if (!props) return;
  // $FlowFixMe
  const inOut = (state: State) => pick(props, state);
  transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
});

const persistStore = (store: Store, storage: Object) => {
  // store.
  reduxPersistStore(store, {
    debounce: 100,
    keyPrefix: `${APP_NAME}:`,
    transforms,
    whitelist,
    storage,
  });
};

export default persistStore;
