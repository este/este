import configureStorage from './configureStorage';
import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

// Deps.
import Firebase from 'firebase';
import fetch from 'isomorphic-fetch';
import shortid from 'shortid';
import validate from './validate';

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

export default function configureMiddleware(initialState, platformDeps, platformMiddleware) {
  const firebase = new Firebase(initialState.config.firebaseUrl);
  // // Check whether connection works.
  // firebase.child('hello-world').set({
  //   createdAt: Firebase.ServerValue.TIMESTAMP
  // });
  const {
    STORAGE_SAVE,
    storageEngine,
    storageMiddleware,
  } = configureStorage(initialState, platformDeps.createStorageEngine);

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      fetch,
      firebase,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      storageEngine,
      validate,
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    ...platformMiddleware,
  ];

  if (storageMiddleware) {
    middleware.push(storageMiddleware);
  }

  const enableLogger =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER || initialState.device.isReactNative;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [STORAGE_SAVE];
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  return middleware;
}
