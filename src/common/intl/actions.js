export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';

export function setCurrentLocale(locale) {
  return {
    type: SET_CURRENT_LOCALE,
    payload: { locale }
  };
}
