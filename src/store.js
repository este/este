// Redux
import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createDependencies from './lib/injectDependencies';

// Top level reducer
import rootReducer from './reducers';

// Dependencies middleware detects all actionsCreators that return function
// instead of a Flux Standard Action. In that case, that function is given
// the object of registered dependencies + getState,
// so it can destruct it and use services it needs to fullfill requests
// See auth/actions.js for an example
const dependenciesMiddleware = createDependencies({
  fetch: window.fetch
});

const finalStore = compose(
  applyMiddleware(dependenciesMiddleware, promiseMiddleware)
)(createStore);

// Store can now be imported from any file,
// e.g. import store from '../store';
// const isLoggedIn = !!store.getState().user.token;
export default finalStore(rootReducer);
