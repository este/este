// @flow
import type { Action, Id, UserForm } from '../../types';

export const setUserForm = (id: Id, state: ?UserForm): Action => ({
  type: 'SET_USER_FORM',
  id,
  state,
});
