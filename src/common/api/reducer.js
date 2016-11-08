import * as actions from './actions';
import { Record } from '../transit';
import { List, Map } from 'immutable';

const State = Record({
  movies: new Map(),
  reservations: new Map(),
  user: new Map(),
  cinema: new Map()
}, 'api');

const apiReducer = (state = new State(), action) => {
  switch (action.type) {
    case actions.FETCH_MOVIES_SUCCESS:
      return state.setIn(['movies', 'data'], new List(action.payload));

    case actions.FETCH_RESERVATIONS_SUCCESS:
      return state.setIn(['reservations', 'data'], new List(action.payload));

    case actions.FETCH_USER_SUCCESS:
      return state.setIn(['user', 'data'], new Map(action.payload));

    case actions.FETCH_CINEMA_SUCCESS:
      return state.setIn(['cinema', 'data'], new Map(action.payload));

    default:
      return state;

  }
};

export default apiReducer;
