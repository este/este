import invariant from 'invariant';
import storage from 'redux-storage';
import storageDebounce from 'redux-storage-decorator-debounce';
import { APP_STORAGE_LOAD } from './app/actions';
import { Iterable } from 'immutable';
import { fromJSON, toJSON } from './transit';

const stateToSave = [
  ['fields'],
  ['todos'],
  ['intl', 'currentLocale'],
  ['users', 'viewer'],
];

const invariantFeatureState = (state, feature) => invariant(
  Iterable.isIterable(state[feature]),
  `Storage persists only immutable iterables. '${feature}' is something else.`
);

const updateState = (state, storageStateJson) => {
  try {
    fromJSON(storageStateJson).forEach(({ feature, featurePath, value }) => {
      invariantFeatureState(state, feature);
      // As we can see, updateState always overrides the current app state.
      // That's perfect for fields, currentLocale, or viewer.
      // But what if todos are prefetched on the server? Then we would like to
      // merge locally cached with fresh from the server. TODO: Add customUpdate.
      state[feature] = state[feature].setIn(featurePath, value);
    });
  } catch (error) {
    // Shouldn't happen, but if the data's invalid, there's not much we can do.
  }
  return state;
};

const storageFilter = engine => ({
  ...engine,
  save(state) {
    const saveState = stateToSave.map(([feature, ...featurePath]) => {
      invariantFeatureState(state, feature);
      return {
        feature, featurePath, value: state[feature].getIn(featurePath)
      };
    });
    return engine.save(toJSON(saveState));
  }
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

export default function configureStorage(initialState, createStorageEngine) {
  const storageEngine =
    createStorageEngine &&
    createStorageEngine(`redux-storage:${initialState.config.appName}`);
  const storageMiddleware =
    storageEngine &&
    createStorageMiddleware(storageEngine);

  return {
    STORAGE_SAVE: storage.SAVE,
    storageEngine,
    storageMiddleware
  };
}
