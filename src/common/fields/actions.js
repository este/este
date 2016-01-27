export const SET_FIELD = 'SET_FIELD';

export function setField(path, value) {
  return {
    type: SET_FIELD,
    payload: {path, value}
  };
}

// TODO: Add field, remove field, reset fields. Etc.
