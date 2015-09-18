export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';

export function selectLanguage(locale = 'en') {
  return {
    type: SELECT_LANGUAGE,
    payload: {locale}
  };
}
