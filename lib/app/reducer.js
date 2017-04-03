// @flow
import type { Action } from '../../types';

export type AppState = {|
  +online: boolean,
|};

const initialState = {
  // name: string,
  // version: string,
  online: false,
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    // case 'APP_ONLINE':
    //   return { ...state, online: action.payload.online };
    default:
      return state;
  }
};

export default reducer;
