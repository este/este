// Redux
import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createDependencies from './lib/injectDependencies';

// Top level reducer
import rootReducer from './reducers';

const dependenciesMiddleware = createDependencies({
  fetch: window.fetch
});

const finalStore = compose(
  applyMiddleware(dependenciesMiddleware, promiseMiddleware)
)(createStore);

export default finalStore(rootReducer);
