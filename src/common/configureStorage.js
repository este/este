/* @flow weak */
import invariant from 'invariant';
import storage from 'redux-storage';
import storageDebounce from 'redux-storage-decorator-debounce';
import { APP_STORAGE_LOAD } from './app/actions';
import { Iterable } from 'immutable';
import { fromJSON, toJSON } from './transit';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

const stateToSave = [
  ['fields'],
  ['intl', 'currentLocale'],
  ['themes', 'currentTheme'],
  ['todos'],
  ['users', 'viewer'],
];

if (isReactNative) {
  stateToSave.push(['routing', 'currentTab']);
}

const invariantFeatureState = (state, feature) => invariant(
  Iterable.isIterable(state[feature]),
  `Storage persists only immutable iterables. '${feature}' is something else.`
);

const updateState = (state, storageStateJson) => {
  const empty = !storageStateJson || !Object.keys(storageStateJson).length;
  if (empty) return state;
  try {
    fromJSON(storageStateJson).forEach(({ feature, featurePath, value }) => {
      const canSet = state[feature] && state[feature].hasIn(featurePath);
      if (!canSet) return;
      // As we can see, setIn always overrides the current value.
      // That's perfect for fields, currentLocale, or viewer.
      // But what if something is prefetched on the server? Then we would like
      // to merge locally cached data with fresh data from the server.
      // TODO: Add customUpdate.
      state[feature] = state[feature].setIn(featurePath, value);
    });
  } catch (error) {
    // Shouldn't happen, but if the data's invalid, there's not much we can do.
    console.log(error); // eslint-disable-line no-console
  }
  return state;
};

const storageFilter = engine => ({
  ...engine,
  save(state) {
    if (!state) return Promise.resolve();

    // We don't filter by actions but by the app state structure.
    // That's fine because saving is debounced.
    const saveState = stateToSave.map(([feature, ...featurePath]) => {
      invariantFeatureState(state, feature);
      return {
        feature, featurePath, value: state[feature].getIn(featurePath),
      };
    });
    return engine.save(toJSON(saveState));
  },
});

const createStorageMiddleware = storageEngine => {
  let decoratedEngine = storageFilter(storageEngine);
  decoratedEngine = storageDebounce(decoratedEngine, 300);
  return storage.createMiddleware(decoratedEngine);
};

export const updateStateOnStorageLoad = reducer => (state, action) => {
  if (action.type === APP_STORAGE_LOAD) {
    state = updateState(state, action.payload);
  }
  return reducer(state, action);
};

const configureStorage = (initialState, createStorageEngine) => {
  const storageEngine =
    createStorageEngine &&
    createStorageEngine(`redux-storage:${initialState.config.appName}`);
  const storageMiddleware =
    storageEngine &&
    createStorageMiddleware(storageEngine);

  return {
    STORAGE_SAVE: storage.SAVE,
    storageEngine,
    storageMiddleware,
  };
};

export default configureStorage;
