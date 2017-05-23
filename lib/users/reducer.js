// @flow
import type { Action, UsersState } from '../../types';
// import { reject, isNil } from 'ramda';

const initialState = {
  local: {},
};

const reducer = (
  state: UsersState = initialState,
  action: Action
): UsersState => {
  switch (action.type) {
    case 'ADD_USER': {
      const { user } = action;
      return {
        ...state,
        local: {
          ...state.local,
          [user.id]: user,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
