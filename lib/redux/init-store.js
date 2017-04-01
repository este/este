// @flow
// import initMiddleware from './init-middleware';
// import initReducer from './init-reducer';
// import { createStore } from 'redux';

// Type?
// const InitialState = {
//
// }

// let clientStore = null;

const initStore = (/* initialState, options */) => {
  // let store;
  // if (!process.browser || !clientStore) {
  //   const reducer = initReducer(options.platformReducers);
  //   const middleware = initMiddleware(options.platformMiddleware);
  //   store = createStore(initReducer(), initialState, middleware);
  //   if (!process.browser) {
  //     return store;
  //   }
  //   clientStore = store;
  // }
  // return clientStore;
};

export default initStore;

// const initStore = (client: any, initialState: any) => {
//   let store;
//   if (!process.browser || !reduxStore) {
//     const middleware = initReduxMiddleware(client.middleware());
//     store = createStore(initReduxReducer(client), initialState, middleware);
//     if (!process.browser) {
//       return store;
//     }
//     reduxStore = store;
//   }
//   return reduxStore;
// };
//
// export default initStore;
