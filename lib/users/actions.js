// @flow
import type { Action, User } from '../../types';

export const addUser = (user: User): Action => ({
  type: 'ADD_USER',
  user,
});
