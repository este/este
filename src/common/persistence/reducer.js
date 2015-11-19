import * as actions from './actions';
import Persistence from './Persistence';

const initialState = new Persistence;

export default function persitenceStoreReducer(state = initialState, action) {
  if (!(state instanceof Persistence)) return initialState.merge(state);

  switch (action.type) {

    case actions.PERSISTENCE_SET: {
      const {key, value} = action.data;
      return state.set(key, value);
    }

    case actions.PERSISTENCE_REMOVE: {
      const {key} = action.data;
      return state.remove(key);
    }

  }

  return state;
}
