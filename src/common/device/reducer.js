import * as actions from './actions';
import {Record} from 'immutable';

const InitialState = Record({
  isMobile: false,
  platform: '',
  host: ''
});
const initialState = new InitialState;

export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    case actions.SET_PLATFORM: {
      const {platform} = action.payload;
      return state.set('platform', platform);
    }

  }

  return state;
}
