/* @flow */
import type { Action, Deps } from '../types';
import createUserFirebase from '../users/createUserFirebase';
import invariant from 'invariant';
import messages from '../lib/redux-firebase/messages';
import { Observable } from 'rxjs/Observable';
import { ValidationError } from '../lib/validation';

export const onAuth = (firebaseUser: ?Object): Action => ({
  type: 'ON_AUTH',
  payload: { firebaseUser },
});

export const resetPassword = (email: string): Action => ({
  type: 'RESET_PASSWORD',
  payload: { email },
});

export const signIn = (providerName: string, options?: Object): Action => ({
  type: 'SIGN_IN',
  payload: { providerName, options },
});

export const signInDone = (firebaseUser: Object): Action => ({
  type: 'SIGN_IN_DONE',
  payload: {
    user: createUserFirebase(firebaseUser),
  },
});

export const signInFail = (error: Error): Action => ({
  type: 'SIGN_IN_FAIL',
  payload: { error },
});

export const signOut = () => ({ firebaseAuth }: Deps): Action => {
  firebaseAuth().signOut();
  return {
    type: 'SIGN_OUT',
  };
};

export const signUp = (providerName: string, options?: Object): Action => ({
  type: 'SIGN_UP',
  payload: { providerName, options },
});

export const signUpDone = (firebaseUser: Object): Action => ({
  type: 'SIGN_UP_DONE',
  payload: {
    user: createUserFirebase(firebaseUser),
  },
});

export const signUpFail = (error: Error): Action => ({
  type: 'SIGN_UP_FAIL',
  payload: { error },
});

const validateEmailAndPassword = (validate, fields) => validate(fields)
  .prop('email')
    .required()
    .email()
  .prop('password')
    .required()
    .simplePassword()
  .promise;

const mapFirebaseErrorToEsteValidationError = (code) => {
  const prop = {
    'auth/email-already-in-use': 'email',
    'auth/invalid-email': 'email',
    'auth/user-not-found': 'email',
    'auth/wrong-password': 'password',
  }[code];
  return new ValidationError(code, { prop });
};

const resetPasswordEpic = (action$: any, { firebaseAuth }: Deps) =>
  action$
    .filter((action: Action) => action.type === 'RESET_PASSWORD')
    .mergeMap(({ payload: { email } }) => {
      firebaseAuth().sendPasswordResetEmail(email);
      return Observable.of();
    });

const facebookPermissions = [
  'email',
  'public_profile',
  'user_friends',
];

const signInEpic = (
  action$: any,
  { FBSDK, firebaseAuth, validate }: Deps,
) => {
  // groups.google.com/forum/#!msg/firebase-talk/643d_lwUAMI/bfQyn8D-BQAJ
  // stackoverflow.com/a/33997042/233902
  const isMobileFacebookApp = () => {
    const ua = navigator.userAgent || navigator.vendor; // eslint-disable-line no-undef
    return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
  };

  const signInWithEmailAndPassword = (options) => {
    const { email, password } = options;
    const promise = validateEmailAndPassword(validate, { email, password })
      .then(() => firebaseAuth().signInWithEmailAndPassword(email, password));
    return Observable.from(promise)
      .map(firebaseUser => signInDone(firebaseUser))
      .catch((error) => {
        if (messages[error.code]) {
          error = mapFirebaseErrorToEsteValidationError(error.code);
        }
        return Observable.of(signInFail(error));
      });
  };

  const signInWithRedirect = provider =>
    Observable.from(firebaseAuth().signInWithRedirect(provider))
      .mergeMap(() => Observable.of()) // Don't return anything on redirect.
      .catch(error => Observable.of(signInFail(error)));

  const signInWithPopup = provider =>
    Observable.from(firebaseAuth().signInWithPopup(provider))
      .map(userCredential => signInDone(userCredential.user))
      .catch((error) => {
        if (error.code === 'auth/popup-blocked') {
          return signInWithRedirect(provider);
        }
        return Observable.of(signInFail(error));
      });

  const nativeSignIn = () =>
    Observable.from(FBSDK.LoginManager.logInWithReadPermissions(facebookPermissions))
      .mergeMap((result) => {
        if (result.isCancelled) {
          // Mimic Firebase error to have the same universal API.
          const error: any = new Error('auth/popup-closed-by-user');
          error.code = 'auth/popup-closed-by-user';
          throw error;
        }
        return Observable.from(FBSDK.AccessToken.getCurrentAccessToken());
      })
      .mergeMap(({ accessToken }) => {
        const facebookCredential = firebaseAuth.FacebookAuthProvider
          .credential(accessToken.toString());
        return Observable.from(firebaseAuth().signInWithCredential(facebookCredential));
      })
      .map(firebaseUser => signInDone(firebaseUser))
      .catch(error => Observable.of(signInFail(error)));

  return action$
    .filter((action: Action) => action.type === 'SIGN_IN')
    .mergeMap(({ payload: { providerName, options } }) => {
      if (options && options.isNative) {
        return nativeSignIn('facebook');
      }
      if (providerName === 'password') {
        return signInWithEmailAndPassword(options);
      }
      // TODO: Add more providers.
      invariant(providerName === 'facebook', `${providerName} provider not supported.`);
      const provider = new firebaseAuth.FacebookAuthProvider();
      // Remember, a user can revoke anything.
      provider.addScope(facebookPermissions.join(','));
      if (isMobileFacebookApp()) {
        return signInWithRedirect(provider);
      }
      return signInWithPopup(provider);
    });
};

const signUpEpic = (action$: any, { firebaseAuth, validate }: Deps) =>
  action$
    .filter((action: Action) => action.type === 'SIGN_UP')
    .mergeMap(({ payload: { providerName, options } }) => {
      invariant(providerName === 'password', `${providerName} provider not supported.`);
      const { email, password } = options;
      const promise = validateEmailAndPassword(validate, { email, password })
        .then(() => firebaseAuth().createUserWithEmailAndPassword(email, password));
      return Observable.from(promise)
        .map(firebaseUser => signUpDone(firebaseUser))
        .catch((error) => {
          if (messages[error.code]) {
            error = mapFirebaseErrorToEsteValidationError(error.code);
          }
          return Observable.of(signUpFail(error));
        });
    });

export const epics = [
  resetPasswordEpic,
  signInEpic,
  signUpEpic,
];
