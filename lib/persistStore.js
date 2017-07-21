// @flow
import type { State, Store /* , Form */ } from '../types';
import {
  createTransform,
  persistStore as reduxPersistStore,
} from 'redux-persist';

// Typed and robust state persistence to local storage.
// TODO: Add redux-persist-migrate.

type PersistStrategy = true | 'emptyObject';
type Persist<T> = { [$Keys<T>]: PersistStrategy | Persist<*> };

const persist = ({
  app: ({
    baselineShown: true,
    darkEnabled: true,
  }: Persist<$PropertyType<State, 'app'>>),
  // auth: {
  //   form: true,
  // },
  posts: ({
    form: true,
  }: Persist<$PropertyType<State, 'posts'>>),
  users: ({
    form: true,
    local: true,
    selected: true,
  }: Persist<$PropertyType<State, 'users'>>),
}: Persist<State>);

const transforms = [];
const whitelist = [];

const pick = (persist: any, state) => {
  switch (persist) {
    case true:
      return state;
    case 'emptyObject':
      return {};
    default:
      return Object.keys(persist).reduce(
        (pickedState, prop) => ({
          ...pickedState,
          [prop]: pick(persist[prop], state[prop]),
        }),
        {},
      );
  }
};

Object.keys(persist).forEach(reducerName => {
  whitelist.push(reducerName);
  // $FlowFixMe
  const reducerPersist = persist[reducerName];
  const inOut = (state: Object) => pick(reducerPersist, state);
  transforms.push(createTransform(inOut, inOut, { whitelist: [reducerName] }));
});

const persistStore = (store: Store, storage: Object) => {
  reduxPersistStore(store, {
    debounce: 100,
    keyPrefix: `${APP_NAME}:`,
    transforms,
    whitelist,
    storage,
  });
};

export default persistStore;
