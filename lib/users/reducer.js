// @flow
import type { Action, UsersState } from '../../types';
import { setForm, resetForm, setFormErrors, addFormId } from '../form';
import { reject, isNil } from 'ramda';

const initialState = {
  form: {
    initial: {
      name: '',
      description: '',
      likesCats: false,
      likesDogs: false,
      gender: null,
      wantsKing: false,
    },
    changed: {},
    errors: {},
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
        form: setForm(state.form, action.id, action.form),
      };
    case 'ADD_USER_ERROR': {
      return {
        ...state,
        form: setFormErrors(state.form, addFormId, action.validationErrors),
      };
    }
    case 'ADD_USER_SUCCESS':
    case 'SAVE_USER_SUCCESS': {
      const { user } = action;
      return {
        ...state,
        form: resetForm(
          state.form,
          action.type === 'ADD_USER_SUCCESS' ? addFormId : user.id
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
      const local = {};
      const changed = {};
      const errors = {};
      Object.keys(state.local).forEach(id => {
        if (state.selected[id]) return;
        local[id] = state.local[id];
        changed[id] = state.form.changed[id];
        errors[id] = state.form.errors[id];
      });
      return {
        ...state,
        form: { ...state.form, changed, errors },
        local,
        selected: {},
      };
    }

    default:
      return state;
  }
};

export default reducer;
