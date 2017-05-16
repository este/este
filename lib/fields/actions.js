// @flow
import type { Action, Fields } from '../../types';

export const setFields = (id: string, fields: Fields): Action => ({
  type: 'SET_FIELDS',
  payload: { id, fields },
});

// Maybe, but it must accept fields, and remove object if empty.
// export const resetFields = (id: string): Action => ({
//   type: 'RESET_FIELDS',
//   payload: { id },
// });
