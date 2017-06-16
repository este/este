// @flow
import type { Action, ConfigState } from '../../types';

const initialState = {
  baselineShown: false,
  darkEnabled: false,
  name: APP_NAME,
  version: APP_VERSION,
};

// flow.org/en/docs/frameworks/redux/#toc-typing-redux-reducers
const reducer = (
  state: ConfigState = initialState,
  action: Action,
): ConfigState => {
  switch (action.type) {
    case 'TOGGLE_BASELINE':
      return { ...state, baselineShown: !state.baselineShown };
    case 'TOGGLE_DARK':
      return { ...state, darkEnabled: !state.darkEnabled };
    default:
      return state;
  }
};

export default reducer;
