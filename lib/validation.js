// @flow

export const isRequired = (object: Object, prop: string) => {
  console.log(object[prop]);
  return false;
};
