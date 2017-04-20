// @flow
import type { Action, AppState } from '../../types';

const initialState = {
  baselineShown: true,
  name: APP_NAME,
  online: false,
  version: APP_VERSION,
};

// flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_APP_ONLINE':
      return { ...state, online: action.payload.online };
    case 'TOGGLE_BASELINE':
      return { ...state, baselineShown: !state.baselineShown };
    default:
      return state;
  }
};

export default reducer;
