/* @flow */
export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';

export const setCurrentLocale = (locale: string) => ({
  type: SET_CURRENT_LOCALE,
  payload: { locale },
});
