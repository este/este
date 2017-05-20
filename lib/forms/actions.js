// @flow
import type { Action, Id, UserForm } from '../../types';

export const setUserForm = (id: Id, state: UserForm): Action => ({
  type: 'SET_USER_FORM',
  id,
  state,
});

// Maybe, but it must accept fields, and remove object if empty.
// export const resetFields = (id: string): Action => ({
//   type: 'RESET_FIELDS',
//   payload: { id },
// });
