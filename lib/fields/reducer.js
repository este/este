// @flow
import type { Action, FieldsState } from '../../types';
import { assocPath, dissocPath } from 'ramda';

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
      const { id, fields } = action.payload;
      return {
        ...state,
        changed: {
          ...state.changed,
          [id]: {
            ...state.changed[id],
            ...fields,
          },
        },
      };
    }
    // case actions.FIELDS_RESET_FIELDS: {
    //   const { path } = action.payload;
    //   return dissocPath(path, state);
    // }
    //
    // case actions.FIELDS_SET_FIELD: {
    //   const { path, value } = action.payload;
    //   return assocPath(path, value, state);
    // }


    default:
      return state;
  }
};

export default reducer;
