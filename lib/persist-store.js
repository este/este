// @flow
import type { Store } from '../types';
import {
  createTransform,
  persistStore as reduxPersistStore,
} from 'redux-persist';
import { pick } from 'ramda';

// TODO: Add redux-persist-migrate.

type Feature = string;
type FeatureProps = ?Array<string>;

const paths: Array<[Feature, FeatureProps]> = [
  ['app', ['baselineShown', 'darkEnabled']],
  ['forms', null],
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
  const inOut = state => pick(props, state);
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
