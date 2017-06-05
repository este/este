// @flow
import type { Action, UsersState } from '../../types';
import { reduceForm, addFormId } from '../form';
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
        form: reduceForm(state.form, action.id, action.state),
      };
    case 'ADD_USER_SUCCESS':
    case 'SAVE_USER_SUCCESS': {
      const { user } = action;
      return {
        ...state,
        form: reduceForm(
          state.form,
          action.type === 'ADD_USER_SUCCESS' ? addFormId : user.id,
          null
        ),
        local: { ...state.local, [user.id]: user },
      };
    }
    case 'TOGGLE_USERS_SELECTION': {
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
      const newFormChangedState = {};
      Object.keys(state.local).forEach(id => {
        if (state.selected[id]) return;
        newLocal[id] = state.local[id];
        newFormChangedState[id] = state.form.changedState[id];
      });
      return {
        ...state,
        form: { ...state.form, changedState: newFormChangedState },
        local: newLocal,
        selected: {},
      };
    }

    default:
      return state;
  }
};

export default reducer;
