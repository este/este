/* @flow */
export const NATIVE_ROUTING_SELECT_TAB = 'NATIVE_ROUTING_SELECT_TAB';

export const selectTab = (key: string) => ({
  type: NATIVE_ROUTING_SELECT_TAB,
  payload: { key },
});
