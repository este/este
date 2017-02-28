// @flow
export const FIELDS_RESET_FIELDS = 'FIELDS_RESET_FIELDS';
export const FIELDS_SET_FIELD = 'FIELDS_SET_FIELD';

type Path = Array<string>;

export const resetFields = (path: Path) => ({
  type: FIELDS_RESET_FIELDS,
  payload: { path },
});

export const setField = (path: Path, value: any) => ({
  type: FIELDS_SET_FIELD,
  payload: { path, value },
});
