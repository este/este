/* @flow weak */
// import invariant from 'invariant';
import { Map } from 'immutable';
import { createTransform } from 'redux-persist';
import { fromJSON, toJSON } from './transit';

const SAVE_DEBOUNCE = 33;

const whitelist = [];
const savePaths = [
  ['fields'],
  ['todos'],
  ['intl', ['currentLocale']],
  ['themes', ['currentTheme']],
  ['users', ['viewer']],
];

const pathFilter = (state, paths = []) => {
  let subset = Map();
  paths.forEach(path => {
    if (state.hasIn(path)) {
      subset = subset.setIn(path, state.getIn(path));
    }
  });
  return subset;
};

const filterSavePaths = initialState => savePaths.map(([feature, ...path]) => {
  whitelist.push(feature);
  return createTransform(
    state => path.length ? pathFilter(state, path) : state,
    state => initialState[feature].merge(state),
    { whitelist: [feature] }
  );
});

const transformImmutables = createTransform(
  state => toJSON(state),
  state => fromJSON(state));

// Rehydrating from disk always overrides the current value.
// That's perfect for fields, currentLocale, or viewer.
// But what if something is prefetched on the server? Then we would like
// to merge locally cached data with fresh data from the server.
// Research comparing to default store or timestamp/revision reducers.
// TODO: Add customUpdate.
const configureStorage = (initialState, storageEngine) => {
  const keyPrefix = `${initialState.config.appName}:`;
  const config = storageEngine && {
    keyPrefix,
    whitelist,
    debounce: SAVE_DEBOUNCE,
    storage: storageEngine,
    transforms: [...filterSavePaths(initialState), transformImmutables],
  };

  return config;
};

export default configureStorage;
