// @flow
import type { Action } from '../../types';

export const toggleBaseline = (): Action => ({
  type: 'TOGGLE_BASELINE',
});

export const toggleDark = (): Action => ({
  type: 'TOGGLE_DARK',
});
