import { setCurrentLocale } from '../intl/actions';

export const UPDATE_APP_STATE_FROM_STORAGE = 'UPDATE_APP_STATE_FROM_STORAGE';

export function updateAppStateFromStorage() {
  return ({ dispatch, engine }) => {
    engine.load().then(state => {
      if (state.intl && state.intl.currentLocale) {
        dispatch(setCurrentLocale(state.intl.currentLocale));
      }
    });
    return {
      type: UPDATE_APP_STATE_FROM_STORAGE
    };
  };
}
