// @flow
import type { Action, Deps } from '../types';
import createUserFirebase from './createUserFirebase';
import { Observable } from 'rxjs/Observable';
import { appError } from '../app/actions';
import { dissoc } from 'ramda';

export const onUsersPresence = (snap: Object): Action => {
  const presence = snap.val();
  return {
    type: 'ON_USERS_PRESENCE',
    payload: { presence },
  };
};

export const saveUserDone = (): Action => ({
  type: 'SAVE_USER_DONE',
});

const saveUserEpic = (action$: any, { firebase }: Deps) =>
  Observable.merge(
    action$.filter((action: Action) => action.type === 'SIGN_IN_DONE'),
    action$.filter((action: Action) => action.type === 'SIGN_UP_DONE'),
  ).mergeMap(action => {
    const { email, ...user } = action.payload.user;
    const promise = firebase.update({
      [`users/${user.id}`]: user,
      [`users-emails/${user.id}`]: { email },
    });
    return Observable.from(promise)
      .map(saveUserDone)
      .catch(error => Observable.of(appError(error)));
  });

const usersPresenceEpic = (
  action$: any,
  { firebase, firebaseDatabase }: Deps,
) => {
  const createInfoConnected$ = user =>
    Observable.create(() => {
      let connectionRef;
      const onConnectedValue = snap => {
        const online = snap.val();
        if (!online) return;
        if (connectionRef) connectionRef.remove();
        connectionRef = firebase.child(`users-presence/${user.id}`).push({
          lastSeenAt: firebaseDatabase.ServerValue.TIMESTAMP,
          user: dissoc('email', user),
        });
        connectionRef.onDisconnect().remove();
      };
      firebase.child('.info/connected').on('value', onConnectedValue);
      return () => {
        if (connectionRef) connectionRef.remove();
        firebase.child('.info/connected').off('value', onConnectedValue);
      };
    });

  return (
    action$
      .filter((action: Action) => action.type === 'ON_AUTH')
      // switchMap unsubscribes previous stream, which is exactly what we want.
      .switchMap(action => {
        const user = createUserFirebase(action.payload.firebaseUser);
        return user ? createInfoConnected$(user) : Observable.of();
      })
  );
};

export const epics = [saveUserEpic, usersPresenceEpic];
