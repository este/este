// @flow
import type { Action, Id, User, UserForm } from '../../types';

export const setUserForm = (id: Id, state: ?UserForm): Action => ({
  type: 'SET_USER_FORM',
  id,
  state,
});

export const addUser = (form: UserForm): Action => ({
  type: 'ADD_USER',
  form,
});

export const add100RandomUsers = (): Action => ({
  type: 'ADD_100_RANDOM_USERS',
});

export const saveUser = (user: User): Action => ({
  type: 'SAVE_USER',
  user: ({
    ...user,
    updatedAt: Date.now(),
  }: User),
});

export const toggleUsersSelection = (users: Array<User>): Action => ({
  type: 'TOGGLE_USERS_SELECTION',
  users,
});

export const deleteSelectedUsers = (): Action => ({
  type: 'DELETE_SELECTED_USERS',
});
