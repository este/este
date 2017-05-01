// @flow
import type { Action } from '../../types';

export const setAppOnline = (online: boolean): Action => ({
  type: 'SET_APP_ONLINE',
  payload: { online },
});

export const toggleBaseline = (): Action => ({
  type: 'TOGGLE_BASELINE',
});

export const toggleDark = (): Action => ({
  type: 'TOGGLE_DARK',
});
