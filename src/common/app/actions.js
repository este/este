/* @flow weak */
import { firebaseStart } from '../lib/redux-firebase/actions';

export const APP_OFFLINE = 'APP_OFFLINE';
export const APP_ONLINE = 'APP_ONLINE';
export const APP_SHOW_MENU = 'APP_SHOW_MENU';
export const APP_START = 'APP_START';
export const APP_STORAGE_LOAD = 'APP_STORAGE_LOAD';

export const showMenu = (show: bool) => ({
  type: APP_SHOW_MENU,
  payload: { show },
});

export const start = () => {
  const loadStorage = async (dispatch, storageEngine) => {
    const state = await storageEngine.load();
    dispatch({ type: APP_STORAGE_LOAD, payload: state });
  };
  return ({ dispatch, storageEngine }) => {
    loadStorage(dispatch, storageEngine).finally(() => {
      dispatch(firebaseStart());
    });
    return {
      type: APP_START,
    };
  };
};
