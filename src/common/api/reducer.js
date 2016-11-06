import * as actions from './actions';
import { Record } from '../transit';
import { List, Map } from 'immutable';

const State = Record({
  movies: new Map()
}, 'api');

const apiReducer = (state = new State(), action) => {
  switch (action.type) {
    case actions.FETCH_MOVIES_SUCCESS:
      return state.setIn(['movies', 'data'], new List(action.payload));

    default:
      return state;

  }
};

export default apiReducer;
