import Promise from 'bluebird';
import immutable from 'immutable';

export default function fetchData(routerState, appState) {
  const {params, query} = routerState;
  return Promise.settle(routerState.routes.filter((route) => {
    return route.handler.fetchData;
  }).reduce((promises, route) => {
    const promise = route.handler.fetchData(false, params, query, appState);
    if (promise) promises.push(promise);
    return promises;
  }, [])).then(receivedData =>
    receivedData
      .filter(promise => promise.isFulfilled())
      .map(promise => promise.value())
  ).then(data => {
    if (data.length < 1)
      return false;
    return immutable.fromJS(appState).merge(...data).toJS();
  });
}
