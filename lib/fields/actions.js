// @flow
import type { Action, Fields } from '../../types';

export const setField = (id: string, fields: Fields): Action => ({
  type: 'SET_FIELD',
  payload: { id, fields },
});

// @flow
// export const FIELDS_RESET_FIELDS = 'FIELDS_RESET_FIELDS';
// export const FIELDS_SET_FIELD = 'FIELDS_SET_FIELD';

// type Path = Array<string>;
//
// export const resetFields = (path: Path) => ({
//   type: FIELDS_RESET_FIELDS,
//   payload: { path },
// });
//
// export const setField = (path: Path, value: any) => ({
//   type: FIELDS_SET_FIELD,
//   payload: { path, value },
// });
