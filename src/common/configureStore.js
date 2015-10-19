import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch';
import injectDependencies from './lib/injectDependencies';
import promiseMiddleware from 'redux-promise-middleware';
import stateToJS from './lib/stateToJS';
import validate from './validate';
import {applyMiddleware, createStore} from 'redux';

// TODO: Add example for browser/native storage.
// import storage from 'redux-storage';

export default function configureStore({engine, initialState} = {}) {

  // This is something like services in Angular, but without magic DI resolver,
  // which is cool if you need it, but much better is design where DI resolver
  // is not needed. Why DI container is not needed anymore? Remember, we are
  // using dependency injection only for stuff with state (instances etc.).
  // If app state is atomic aka at one place in whole app, we don't need DI
  // container anymore. injectDependencies with custom factories is all we need.
  const dependenciesMiddleware = injectDependencies(
    {fetch},
    {validate}
  );

  const middleware = [
    dependenciesMiddleware,
    promiseMiddleware
  ];

  // TODO: Add storage example.
  // if (engine) {
  //   // The order is important.
  //   engine = storage.decorators.filter(engine, [
  //     ['todos', 'list']
  //   ]);
  //   engine = storage.decorators.debounce(engine, 1500);
  //   middleware.push(storage.createMiddleware(engine));
  // }

  // Logger must be last middleware in chain.
  if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
    const logger = createLogger({
      collapsed: true,
      transformer: stateToJS
    });
    middleware.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware);
  const store = createStoreWithMiddleware(createStore)(appReducer, initialState);

  // Enable hot reload where available.
  if (module.hot) { // eslint-disable-line no-undef
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => { // eslint-disable-line no-undef
      const nextAppReducer = require('./app/reducer'); // eslint-disable-line no-undef
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
