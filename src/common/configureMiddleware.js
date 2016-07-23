import configureStorage from './configureStorage';
import createLoggerMiddleware from 'redux-logger';

// Deps.
import firebase from 'firebase';
import shortid from 'shortid';
import validate from './validate';

let firebaseDeps = null;

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

// Like redux-promise-middleware but without the noise.
const promiseMiddleware = ({ dispatch }) => next => action => {
  const { type, payload: promise } = action;
  const isPromise = promise && typeof promise.then === 'function';
  if (!isPromise) return next(action);
  const createAction = (suffix, payload) => ({
    type: `${type}_${suffix}`, meta: { action }, payload,
  });
  next(createAction('START'));
  const onFulfilled = value => {
    dispatch(createAction('SUCCESS', value));
    return value;
  };
  const onRejected = error => {
    dispatch(createAction('ERROR', error));
    throw error;
  };
  return promise.then(onFulfilled, onRejected);
};

export default function configureMiddleware(initialState, platformDeps, platformMiddleware) {
  if (!firebaseDeps) {
    // Lazy init.
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
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      storageEngine,
      validate,
    }),
    promiseMiddleware,
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
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    middleware.push(logger);
  }

  return middleware;
}
