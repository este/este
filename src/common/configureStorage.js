import storage from 'redux-storage';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import { APP_STORAGE_LOAD } from './app/actions';
import { Seq, fromJS } from 'immutable';

export const updateStateOnStorageLoad = reducer => (state, action) => {
  if (action.type === APP_STORAGE_LOAD) {
    const storageState = action.payload;
    Seq(storageState).forEach((featureStorageState, feature) => {
      if (!state[feature]) return;
      state = {
        ...state,
        // Note that JSON.stringify works even with immutables.
        [feature]: fromJS(JSON.parse(JSON.stringify(state[feature])))
          .mergeDeep(fromJS(featureStorageState))
          .toJS() // Convert to JSON to invoke reducer reviver.
      };
    });
  }
  return reducer(state, action);
};

const createStorageMiddleware = storageEngine => {
  let decoratedEngine = storageFilter(storageEngine, [
    // Note we don't store whole app state in the local storage.
    // First, we don't need it. Second, it could be slow with big datasets.
    ['auth', 'token'],
    ['fields'],
    ['intl', 'currentLocale'],
    ['users', 'viewer'],
  ]);
  decoratedEngine = storageDebounce(decoratedEngine, 300);
  return storage.createMiddleware(decoratedEngine);
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
