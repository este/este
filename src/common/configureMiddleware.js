import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

// Deps
import Firebase from 'firebase';
import fetch from 'isomorphic-fetch';
import shortid from 'shortid';
import validate from './validate';

// Storage
import storage from 'redux-storage';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';

// Like redux-thunk with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

export default function configureMiddleware(
    initialState, platformDeps, platformMiddleware) {
  const engine =
    platformDeps.createEngine &&
    platformDeps.createEngine(`redux-storage:${initialState.config.appName}`);
  const firebase = new Firebase(initialState.config.firebaseUrl);
  // // Check whether connection works.
  // firebase.child('hello-world').set({
  //   createdAt: Firebase.ServerValue.TIMESTAMP
  // });

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      engine,
      fetch,
      firebase,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    ...platformMiddleware
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine, [
      ['intl', 'currentLocale'],
      ['users', 'viewer'],
    ]);
    decoratedEngine = storageDebounce(decoratedEngine, 300);
    middleware.push(storage.createMiddleware(decoratedEngine));
  }

  const enableLogger =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER || initialState.device.isReactNative;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [storage.SAVE];
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
