// @flow
import type { Action, Id, User, UserForm } from '../../types';

export const setUserForm = (id: Id, state: ?UserForm): Action => ({
  type: 'SET_USER_FORM',
  id,
  state,
});

export const addUser = (user: User): Action => ({
  type: 'ADD_USER',
  user,
});

export const saveUser = (user: User): Action => ({
  type: 'SAVE_USER',
  user,
});

export const toggleSelectedUsers = (users: Array<User>): Action => ({
  type: 'TOGGLE_SELECTED_USERS',
  users,
});

// // TODO: Delete user
// export const saveUser = (user: User): Action => ({
//   type: 'SAVE_USER',
//   user,
// });
