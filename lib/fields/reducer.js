// @flow
import type { Action, FieldsState } from '../../types';

const initialState = {
  initial: {
    userName: '',
    userDescription: '',
    userLikesCats: false,
    userLikesDogs: false,
    userGender: null,
    userWantsKing: false,
  },
  changed: {},
};

const reducer = (
  state: FieldsState = initialState,
  action: Action
): FieldsState => {
  switch (action.type) {
    case 'SET_FIELD': {
      const { id, name, value } = action.payload;
      return {
        ...state,
        changed: {
          ...state.changed,
          [id]: {
            ...state.changed[id],
            [name]: value,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
