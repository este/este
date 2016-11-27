/* @flow */
import type { Action } from '../types';

export const setTheme = (theme: string): Action => ({
  type: 'SET_THEME',
  payload: { theme },
});
