// Redux
import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './reducers';

const finalStore = compose(
  applyMiddleware(promiseMiddleware)
)(createStore);

export default finalStore(rootReducer);
