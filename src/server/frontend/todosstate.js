import Promise from 'bluebird';
import Immutable from 'immutable';
import loadTodos from '../../client/todos/loadTodos'

export default function todosState() {

  return (req, res, next) => {
    loadUserData(req).then(loadedData => {
      req.userState = Immutable.Map().merge(...loadedData);
      next();
    });
  };
}

// Gracefully settle all promises, ignore failed.
function loadUserData(req) {
  const dataSources = [
    loadTodos()
  ];

  return Promise.settle(dataSources).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  );
}
