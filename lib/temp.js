// @flow

// temp is a wrapper for temporary values which need to be stored in local
// storage but revived with a different value.
// For example, form disabled state, which needs to be stored because cross tab
// sync, but revived with a false value, otherwise form would be frozen forever.
// It can be used for any value of course.

// Session only value. If tempId is not current then false is returned.
// const value = createTemp(true, false);
// { storeValue: true, retrieveValue: false, tempId: ... }
// temp(value); // true of false by tempId
// Always true is possible too.
// const serverValue = createTemp(true, true);

const tempId = Date.now();

export type Temp<T> = {|
  +storeValue: T,
  +retrieveValue: T,
  +tempId: number,
|};

export const createTemp = <T>(
  storeValue: T,
  retrieveValue: T = storeValue,
): Temp<T> => ({
  storeValue,
  retrieveValue,
  tempId,
});

export const temp = <T>(value: Temp<T>): T =>
  value.tempId === tempId ? value.storeValue : value.retrieveValue;
