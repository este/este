// @flow
import type { Action, Fields } from '../../types';

export const setField = (
  id: string,
  name: $Keys<Fields>,
  value: any
): Action => ({
  type: 'SET_FIELD',
  payload: { id, name, value },
});

// Maybe, but it must accept fields, and remove object if empty.
// export const resetFields = (id: string): Action => ({
//   type: 'RESET_FIELDS',
//   payload: { id },
// });
