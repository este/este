// @flow
import type { Action, UsersState } from '../../types';
import { reject, isNil } from 'ramda';

const initialState = {
  form: {
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
  local: {},
  selected: {},
};

const reducer = (
  state: UsersState = initialState,
  action: Action
): UsersState => {
  switch (action.type) {
    case 'SET_USER_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          // reject(isNil) to remove null values from changedState
          changedState: reject(isNil)({
            ...state.form.changedState,
            [action.id]: action.state,
          }),
        },
      };
    case 'ADD_USER':
    case 'SAVE_USER': {
      const { user } = action;
      return {
        ...state,
        local: {
          ...state.local,
          [user.id]: user,
        },
      };
    }
    case 'TOGGLE_SELECTED_USERS': {
      const ids = action.users.map(user => user.id);
      const allSelected = ids.every(id => state.selected[id]);
      return {
        ...state,
        selected: reject(isNil)({
          ...state.selected,
          ...ids.reduce(
            (ids, id) => ({ ...ids, [id]: allSelected ? null : true }),
            {}
          ),
        }),
      };
    }
    case 'DELETE_SELECTED_USERS': {
      const newLocal = {};
      Object.keys(state.local).forEach(id => {
        if (state.selected[id]) return;
        newLocal[id] = state.local[id];
      });
      return {
        ...state,
        local: newLocal,
        selected: {},
      };
    }

    default:
      return state;
  }
};

export default reducer;
