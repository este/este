// @flow
import type { Action, Deps } from '../types';
import isReactNative from '../../common/app/isReactNative';
import { Actions as FarceActions } from 'farce';
import { Observable } from 'rxjs/Observable';
import { onAuth, signInDone, signInFail } from '../auth/actions';

export const appError = (error: Object): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean): Action => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

export const toggleBaseline = (): Action => ({
  type: 'TOGGLE_BASELINE',
});

export const setTheme = (theme: string): Action => ({
  type: 'SET_THEME',
  payload: { theme },
});

const appStartedEpic = (action$: any, deps: Deps) => {
  const { getState } = deps;

  const streams: Array<any> = [];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

export const epics = [appStartedEpic];
