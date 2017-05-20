// @flow
import type { Action, FormsState } from '../../types';

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
    changes: {},
  },
};

const setForm = (prop, action, state) => ({
  ...state,
  [prop]: {
    ...state[prop],
    changes: {
      ...state[prop].changes,
      [action.id]: action.state,
    },
  },
});

const reducer = (
  state: FormsState = initialState,
  action: Action
): FormsState => {
  switch (action.type) {
    case 'SET_USER_FORM':
      return setForm('user', action, state);
    default:
      return state;
  }
};

export default reducer;
