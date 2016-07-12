import { firebaseStart } from '../lib/redux-firebase/actions';

export const APP_OFFLINE = 'APP_OFFLINE';
export const APP_ONLINE = 'APP_ONLINE';
export const APP_START = 'APP_START';
export const APP_STORAGE_LOAD = 'APP_STORAGE_LOAD';

const loadStorage = async (dispatch, storageEngine) => {
  const state = await storageEngine.load();
  dispatch({ type: APP_STORAGE_LOAD, payload: state });
};

export function start() {
  return ({ dispatch, storageEngine }) => {
    loadStorage(dispatch, storageEngine).finally(() => {
      dispatch(firebaseStart());
    });
    return {
      type: APP_START
    };
  };
}
