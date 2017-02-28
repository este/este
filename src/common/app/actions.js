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
  const { firebase, firebaseAuth, getState } = deps;

  const appOnline$ = Observable.create(observer => {
    const onValue = snap => {
      const online = snap.val();
      if (online === getState().app.online) return;
      observer.next(appOnline(online));
    };
    firebase.child('.info/connected').on('value', onValue);
    return () => {
      firebase.child('.info/connected').off('value', onValue);
    };
  });

  const maybeUpdatePathnameOnAuthChange = firebaseUser => {
    const { pathname } = getState().found.match.location;
    const isSignIn = firebaseUser && pathname === '/signin';
    return FarceActions.replace(isSignIn ? '/' : pathname);
  };

  // firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
  const onAuth$ = Observable.create(observer => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(firebaseUser => {
      observer.next(onAuth(firebaseUser));
      if (!isReactNative) {
        observer.next(maybeUpdatePathnameOnAuthChange(firebaseUser));
      }
    });
    return unsubscribe;
  });

  const signInAfterRedirect$ = Observable.create(observer => {
    let unsubscribed = false;
    firebaseAuth()
      .getRedirectResult()
      .then(({ user: firebaseUser }) => {
        if (unsubscribed || !firebaseUser) return;
        observer.next(signInDone(firebaseUser));
      })
      .catch(error => {
        if (unsubscribed) return;
        observer.error(signInFail(error));
      });
    return () => {
      unsubscribed = true;
    };
  });

  const streams: Array<any> = [appOnline$, onAuth$];

  if (process.env.IS_BROWSER) {
    streams.push(signInAfterRedirect$);
  }

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

export const epics = [appStartedEpic];
