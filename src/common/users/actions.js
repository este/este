/* @flow weak */
import R from 'ramda';
import createUserFirebase from './createUserFirebase';
import { APP_STOP, appError } from '../app/actions';
import { ON_AUTH, SIGN_IN_DONE, SIGN_UP_DONE } from '../auth/actions';
import { Observable } from 'rxjs/Observable';

export const ON_USERS_PRESENCE = 'ON_USERS_PRESENCE';
export const SAVE_USER_DONE = 'SAVE_USER_DONE';

export const onUsersPresence = (snap: Object) => {
  const presence = snap.val();
  return {
    type: ON_USERS_PRESENCE,
    payload: { presence },
  };
};

export const saveUserDone = () => ({
  type: SAVE_USER_DONE,
});

const saveUserEpic = (action$, { firebase }) =>
  Observable.merge(
    action$.ofType(SIGN_IN_DONE),
    action$.ofType(SIGN_UP_DONE),
  )
    .mergeMap((action) => {
      const { email, ...user } = action.payload.user;
      const promise = firebase.update({
        [`users/${user.id}`]: user,
        [`users-emails/${user.id}`]: { email },
      });
      return Observable.from(promise)
        .map(saveUserDone)
        .catch(error => Observable.of(appError(error)));
    });

const usersPresenceEpic = (action$, { firebase, firebaseDatabase }) => {
  const createInfoConnected$ = user => Observable.create(() => {
    let connectionRef;
    const onConnectedValue = (snap) => {
      const online = snap.val();
      if (!online) return;
      if (connectionRef) connectionRef.remove();
      connectionRef = firebase.child(`users-presence/${user.id}`)
        .push({
          lastSeenAt: firebaseDatabase.ServerValue.TIMESTAMP,
          user: R.dissoc('email', user),
        });
      connectionRef.onDisconnect().remove();
    };
    firebase.child('.info/connected').on('value', onConnectedValue);
    return () => {
      if (connectionRef) connectionRef.remove();
      firebase.child('.info/connected').off('value', onConnectedValue);
    };
  });

  return action$.ofType(ON_AUTH)
    // switchMap unsubscribes previous stream, which is exactly what we want.
    .switchMap((action) => {
      const user = createUserFirebase(action.payload.firebaseUser);
      if (user) {
        return createInfoConnected$(user)
          .takeUntil(action$.ofType(APP_STOP));
      }
      return Observable.of();
    });
};

export const epics = [
  saveUserEpic,
  usersPresenceEpic,
];
