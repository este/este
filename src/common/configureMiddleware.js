import configureStorage from './configureStorage';
import createLoggerMiddleware from 'redux-logger';
import { ValidationError } from '../common/lib/validation';

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

// Action payload as promise with error handling.
const promiseMiddleware = options => ({ dispatch }) => next => action => {
  const { payload } = action;
  const payloadIsPromise = payload && typeof payload.then === 'function';
  if (!payloadIsPromise) return next(action);
  const createAction = (suffix, payload) => ({
    type: `${action.type}_${suffix}`, meta: { action }, payload,
  });
  // Note we don't return promise, because martinfowler.com/bliki/CQRS.html
  payload
    .then(value => dispatch(createAction('SUCCESS', value)))
    .catch(error => {
      dispatch(createAction('ERROR', error));
      if (options.onError) options.onError(error);
    });
  return next(createAction('START'));
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
    promiseMiddleware({
      onError(error) {
        if (error instanceof ValidationError) return;
        throw error;
      },
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
}
