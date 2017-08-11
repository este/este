// @flow
import type { State, Store /* , Form */ } from '../types';
import {
  createTransform,
  persistStore as reduxPersistStore,
} from 'redux-persist';

/*
  Typed Redux state persistence for client storage.

  As for client state migrations, it's super brittle. I'm pretty sure
  redux-persist-migrate is not good enough solution. Any mistake can break the
  app and we can't remotely fix it. Therefore, keyPrefix consists of both
  APP_NAME and APP_VERSION. Yep, persisted state is discarded on app update.

  Relay client schema extensions is the way to go. It will make Redux obsolete
  because Relay compliler and GraphQL schema migrations support.
*/

type PersistStrategy = true | 'emptyObject';
type Persist<T> = { [$Keys<T>]: PersistStrategy | Persist<*> };

const persist = ({
  app: ({
    baselineShown: true,
    darkEnabled: true,
  }: Persist<$PropertyType<State, 'app'>>),
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
    keyPrefix: `${APP_NAME}:${APP_VERSION}`,
    transforms,
    whitelist,
    storage,
  });
};

export default persistStore;
