import {Record} from 'immutable';

const Routing = Record({
  path: '/',
  noRouterUpdate: null
});

const initialState = new Routing({});

export default function routingReducer(state = initialState, action) {
  if (!(state instanceof Routing)) return initialState.merge(state);

  if (action.type === '@@router/UPDATE_PATH') {
    const {path, noRouterUpdate} = action;
    return state.merge({path, noRouterUpdate});
  }

  return state;
}
