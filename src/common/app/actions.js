export const UPDATE_APP_STATE_FROM_STORAGE_START = 'UPDATE_APP_STATE_FROM_STORAGE_START';
export const UPDATE_APP_STATE_FROM_STORAGE_SUCCESS = 'UPDATE_APP_STATE_FROM_STORAGE_SUCCESS';

export function updateAppStateFromStorage() {
  return ({ engine }) => ({
    type: 'UPDATE_APP_STATE_FROM_STORAGE',
    payload: engine.load()
  });
}
