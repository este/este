// @flow
import type { Action, FormsState } from '../../types';

const initialState = {
  newUser: {
    name: '',
    description: '',
    likesCats: false,
    likesDogs: false,
    gender: null,
    wantsKing: false,
  },
};

const reducer = (
  state: FormsState = initialState,
  action: Action
): FormsState => {
  switch (action.type) {
    // case 'SET_FIELD': {
    //   const { id, name, value } = action.payload;
    //   return {
    //     ...state,
    //     changed: {
    //       ...state.changed,
    //       [id]: {
    //         ...state.changed[id],
    //         [name]: value,
    //       },
    //     },
    //   };
    // }

    default:
      return state;
  }
};

export default reducer;
