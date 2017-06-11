// @flow

export const required = (value: ?string | Array<any>): boolean => {
  if (value == null) return false;
  return value.length > 0;
};
