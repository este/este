// @flow
import type { Action, FormsState } from '../../types';
import { reject, isNil } from 'ramda';

const initialState = {
  user: {
    initialState: {
      name: '',
      description: '',
      likesCats: false,
      likesDogs: false,
      gender: null,
      wantsKing: false,
    },
    changedState: {},
  },
};

const set = (prop, action, state) => ({
  ...state,
  [prop]: {
    ...state[prop],
    changedState: reject(isNil)({
      ...state[prop].changedState,
      [action.id]: action.state,
    }),
  },
});

const reducer = (
  state: FormsState = initialState,
  action: Action
): FormsState => {
  switch (action.type) {
    case 'SET_USER_FORM':
      return set('user', action, state);
    default:
      return state;
  }
};

export default reducer;
