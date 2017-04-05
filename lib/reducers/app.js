// @flow
import type { Action, AppState } from '../../types';

const initialState = {
  // name: string,
  // version: string,
  online: false,
};

// flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_APP_ONLINE':
      return { ...state, online: action.payload.online };
    default:
      (action: empty);
      return state;
  }
};

export default reducer;
