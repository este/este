export const ESTE_REDUX_FIELDS_RESET_FIELDS = 'ESTE_REDUX_FIELDS_RESET_FIELDS';
export const ESTE_REDUX_FIELDS_SET_FIELD = 'ESTE_REDUX_FIELDS_SET_FIELD';

export function resetFields(path) {
  return {
    type: ESTE_REDUX_FIELDS_RESET_FIELDS,
    payload: { path }
  };
}

export function setField(path, value) {
  return {
    type: ESTE_REDUX_FIELDS_SET_FIELD,
    payload: { path, value }
  };
}
