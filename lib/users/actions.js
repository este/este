// @flow
import type { Action, Id, User, UserForm } from '../../types';

export const setUserForm = (id: Id, state: ?UserForm): Action => ({
  type: 'SET_USER_FORM',
  id,
  state,
});

// TODO: Injection, set id, createdAt, updatedAt asi taky, podle graph.cool
export const addUser = (user: User): Action => ({
  type: 'ADD_USER',
  user,
});

// TODO: Injection, set updatedAt
export const saveUser = (user: User): Action => ({
  type: 'SAVE_USER',
  user,
});

export const toggleUsersSelection = (users: Array<User>): Action => ({
  type: 'TOGGLE_USERS_SELECTION',
  users,
});

export const deleteSelectedUsers = (): Action => ({
  type: 'DELETE_SELECTED_USERS',
});
