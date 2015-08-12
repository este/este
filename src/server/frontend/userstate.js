import Promise from 'bluebird';
import Immutable from 'immutable';

export default function userState() {

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
    loadViewer(req)
  ];

  return Promise.settle(dataSources).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  );
}

function loadViewer(req) {
  return {
    users: {
      viewer: {
        email: req.user && req.user.email,
        password: req.user && req.user.password,
        isLoggedIn: !!req.user
      }
    }
  };
}
