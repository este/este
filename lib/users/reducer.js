// @flow
import type { Action, UsersState } from '../../types';
import { setForm, resetForm, setFormError, newFormId } from '../form';
import { reject, isNil, omit } from 'ramda';

const initialState = {
  form: {
    initial: {
      name: '',
      email: '',
      likesCats: false,
      likesDogs: false,
      gender: null,
      isAnarchist: false,
    },
    changed: {},
    appError: {},
    validationErrors: {},
  },
  local: {},
  selected: {},
};

const reducer = (
  state: UsersState = initialState,
  action: Action,
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
        form: setFormError(state.form, newFormId, action.errors),
      };
    }
    case 'ADD_USER_SUCCESS':
    case 'SAVE_USER_SUCCESS': {
      const { user } = action;
      return {
        ...state,
        form: resetForm(
          state.form,
          action.type === 'ADD_USER_SUCCESS' ? newFormId : user.id,
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
            {},
          ),
        }),
      };
    }
    case 'DELETE_SELECTED_USERS': {
      const ids = Object.keys(state.selected);

      const form = ids.reduce((form, id) => resetForm(form, id), state.form);
      const local = omit(ids, state.local);
      const selected = {};

      return { ...state, form, local, selected };
    }
    default:
      return state;
  }
};

export default reducer;
