/* @flow */
import type { Action } from '../types';

export const setCurrentLocale = (locale: string): Action => ({
  type: 'SET_CURRENT_LOCALE',
  payload: { locale },
});
