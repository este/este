/* @flow weak */
import configureStorage from './configureStorage';
import createLoggerMiddleware from 'redux-logger';
import errorToMessage from '../common/app/errorToMessage';

// Deps.
import firebase from 'firebase';
import validate from './validate';

let firebaseDeps = null;

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

// Like redux-promise-middleware but simpler.
const promiseMiddleware = options => ({ dispatch }) => next => action => {
  const { shouldThrow } = options || {};
  const { payload } = action;
  const payloadIsPromise = payload && typeof payload.then === 'function';
  if (!payloadIsPromise) return next(action);
  const createAction = (suffix, payload) => ({
    type: `${action.type}_${suffix}`, meta: { action }, payload,
  });
  // Note we don't return promise.
  // github.com/este/este/issues/1091
  payload
    .then(value => dispatch(createAction('SUCCESS', value)))
    .catch(error => {
      dispatch(createAction('ERROR', error));
      // Not all errors need to be reported.
      if (shouldThrow(error)) {
        throw error;
      }
    });
  return next(createAction('START'));
};

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  // Lazy init.
  if (!firebaseDeps) {
    firebase.initializeApp(initialState.config.firebase);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseDatabase: firebase.database,
    };
  }
  // Check whether Firebase works.
  // firebaseDeps.firebase.child('hello-world').set({
  //   createdAt: firebaseDeps.firebaseDatabase.ServerValue.TIMESTAMP,
  //   text: 'Yes!'
  // });

  const {
    STORAGE_SAVE,
    storageEngine,
    storageMiddleware,
  } = configureStorage(initialState, platformDeps.createStorageEngine);

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      ...firebaseDeps,
      getUid: () => platformDeps.uuid.v4(),
      now: () => Date.now(),
      storageEngine,
      validate,
    }),
    promiseMiddleware({
      shouldThrow: error => !errorToMessage(error),
    }),
    ...platformMiddleware,
  ];

  if (storageMiddleware) {
    middleware.push(storageMiddleware);
  }

  const enableLogger = process.env.NODE_ENV !== 'production' && (
    process.env.IS_BROWSER || initialState.device.isReactNative
  );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [STORAGE_SAVE];
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    middleware.push(logger);
  }

  return middleware;
};

export default configureMiddleware;
