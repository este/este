export const NATIVE_ROUTING_SELECT_TAB = 'NATIVE_ROUTING_SELECT_TAB';

export function selectTab(key) {
  return {
    type: NATIVE_ROUTING_SELECT_TAB,
    payload: { key },
  };
}
