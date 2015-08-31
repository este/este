import Promise from 'bluebird';
import Router from 'react-router';
import routes from '../../client/routes';
import {Map} from 'immutable';

export default function userState() {

  return (req, res, next) => {
    getRouterState(req.originalUrl)
      .then(routerState => loadUserData(routerState, req))
      .then(loadedData => {
        req.userState = Map().merge(...loadedData);
        next();
      })
      .catch(() => {
        req.userState = Map();
        next();
      });
  };

}

function getRouterState(originalUrl) {
  return new Promise((resolve, reject) => {
    Router.run(routes, originalUrl, (Root, state) => resolve(state));
  });
}

function loadUserData(routerState, req) {
  // We can use params and currentRoutePath to preload only current route, which
  // is convenient  if we are using higher order components for client loading.
  // After React 0.14 release, we will add true isomorphic server fetching.
  // const {params, routes} = routerState;
  // const currentRoutePath = routerState.routes
  //   .map(route => route.name)
  //   .filter(name => name)
  //   .join('/');

  const dataSources = [
    loadTodos()
  ];

  // Gracefully settle all promises, ignore failed.
  return Promise.settle(dataSources).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  );
}

// Simulate async action.
function loadTodos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = {
        todos: {
          list: [
            {id: 2, title: 'relax'}
          ]
        }
      };

      resolve(todos);
    }, 20);
  });
}
