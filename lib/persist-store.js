// @flow
import type { State, Store, FormState } from '../types';
import {
  createTransform,
  persistStore as reduxPersistStore,
} from 'redux-persist';

// Fully typed and robust state to local storage persistence.
// TODO: Add redux-persist-migrate.
// TODO: Purge on render error. Waiting for React 16 error boundaries.

type PersistStrategy = true | 'emptyObject';
type Persist<T> = { [$Keys<T>]: PersistStrategy | Persist<*> };

const formPersist = ({
  initial: true,
  changed: true,
  appError: true,
  validationErrors: true,
  disabled: 'emptyObject', // Never store form disabled state in local storage.
}: Persist<FormState<*>>);

const persist = ({
  app: ({
    baselineShown: true,
    darkEnabled: true,
  }: Persist<$PropertyType<State, 'app'>>),
  users: ({
    form: formPersist,
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
