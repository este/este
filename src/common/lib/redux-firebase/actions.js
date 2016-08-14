import invariant from 'invariant';
import mapFirebaseUserToAppUser from './mapFirebaseUserToAppUser';
import messages from './messages';
import { APP_OFFLINE, APP_ONLINE } from '../../app/actions';
import { ValidationError } from '../validation';
import { replace } from 'react-router-redux';
import { selectTab } from '../../../native/routing/actions';

export const FIREBASE_OFF_QUERY = 'FIREBASE_OFF_QUERY';
export const FIREBASE_ON_AUTH = 'FIREBASE_ON_AUTH';
export const FIREBASE_ON_PERMISSION_DENIED = 'FIREBASE_ON_PERMISSION_DENIED';
export const FIREBASE_ON_QUERY = 'FIREBASE_ON_QUERY';
export const FIREBASE_RESET_PASSWORD_ERROR = 'FIREBASE_RESET_PASSWORD_ERROR';
export const FIREBASE_RESET_PASSWORD_START = 'FIREBASE_RESET_PASSWORD_START';
export const FIREBASE_RESET_PASSWORD_SUCCESS = 'FIREBASE_RESET_PASSWORD_SUCCESS';
export const FIREBASE_SAVE_USER_ERROR = 'FIREBASE_SAVE_USER_ERROR';
export const FIREBASE_SAVE_USER_START = 'FIREBASE_SAVE_USER_START';
export const FIREBASE_SAVE_USER_SUCCESS = 'FIREBASE_SAVE_USER_SUCCESS';
export const FIREBASE_SIGN_IN_ERROR = 'FIREBASE_SIGN_IN_ERROR';
export const FIREBASE_SIGN_IN_START = 'FIREBASE_SIGN_IN_START';
export const FIREBASE_SIGN_IN_SUCCESS = 'FIREBASE_SIGN_IN_SUCCESS';
export const FIREBASE_SIGN_UP_ERROR = 'FIREBASE_SIGN_UP_ERROR';
export const FIREBASE_SIGN_UP_START = 'FIREBASE_SIGN_UP_START';
export const FIREBASE_SIGN_UP_SUCCESS = 'FIREBASE_SIGN_UP_SUCCESS';
export const FIREBASE_START = 'FIREBASE_START';

const facebookPermissions = [
  'email',
  'public_profile',
  'user_friends',
];

const validateEmailAndPassword = (validate, fields) => validate(fields)
  .prop('email')
    .required()
    .email()
  .prop('password')
    .required()
    .simplePassword()
  .promise;

const mapFirebaseErrorToEsteValidationError = code => {
  const prop = {
    'auth/email-already-in-use': 'email',
    'auth/invalid-email': 'email',
    'auth/user-not-found': 'email',
    'auth/wrong-password': 'password',
  }[code];
  return new ValidationError(code, { prop });
};

const emailSignIn = async (firebaseAuth, validate, { email, password }) => {
  await validateEmailAndPassword(validate, { email, password });
  try {
    return await firebaseAuth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (messages[error.code]) {
      throw mapFirebaseErrorToEsteValidationError(error.code);
    }
    throw error;
  }
};

// stackoverflow.com/a/33997042/233902
const isFacebookApp = () => {
  const ua = navigator.userAgent || navigator.vendor; // eslint-disable-line no-undef
  return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
};

const socialSignIn = async (firebaseAuth, providerName) => {
  invariant(providerName === 'facebook',
   `${providerName} provider is not yet supported.`);
  // firebase.google.com/docs/auth/web/facebook-login
  const provider = new firebaseAuth.FacebookAuthProvider();
  provider.addScope(facebookPermissions.join(','));
  // github.com/steida/firebase/issues/15
  if (isFacebookApp()) {
    return await firebaseAuth().signInWithRedirect(provider);
  }
  try {
    return await firebaseAuth().signInWithPopup(provider);
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      // TODO: https://github.com/steida/firebase/issues/15
      return await firebaseAuth().signInWithRedirect(provider);
    }
    throw error;
  }
};

const saveUser = user => ({ firebase }) => {
  // Strip email from user because it's saved in secured collection.
  const { email, ...json } = user.toJS();
  // With Firebase multi-path updates, we can update values at multiple
  // locations at the same time atomically.
  const promise = firebase.update({
    [`users/${user.id}`]: json,
    [`users-emails/${user.id}`]: { email },
  });
  return {
    type: 'FIREBASE_SAVE_USER',
    payload: promise,
  };
};

const onAuth = user => ({ dispatch, getState }) => {
  if (user) {
    // Save user after successful auth to possible update its profile data.
    dispatch(saveUser(user));
  } else if (getState().users.viewer) {
    // Redirect to home page before sign out to ensure a valid view state.
    const action = getState().device.isReactNative
      ? selectTab('home')
      : replace('/');
    dispatch(action);
  }
  return {
    type: FIREBASE_ON_AUTH,
    payload: { user },
  };
};

// firebase.google.com/docs/database/web/offline-capabilities#section-sample
const createPresenceMonitor = () => {
  let connections = [];
  let off = null;

  return (firebase, firebaseDatabase, user) => {
    if (!user) {
      connections.forEach(connection => connection.remove());
      connections = [];
      return;
    }
    const connectedRef = firebase.child('.info/connected');
    const handler = snap => {
      if (!snap.val()) return;
      const userWithoutEmail = user.toJS();
      delete userWithoutEmail.email;
      const connectionRef = firebase.child(`users-presence/${user.id}`)
        .push({
          authenticatedAt: firebaseDatabase.ServerValue.TIMESTAMP,
          user: userWithoutEmail,
        });
      connections.push(connectionRef);
      connectionRef.onDisconnect().remove();
    };
    if (off) off();
    off = () => connectedRef.off('value', handler);
    connectedRef.on('value', handler);
  };
};

export function signIn(providerName, fields) {
  return ({ firebaseAuth, validate }) => {
    const promise = providerName === 'password'
      ? emailSignIn(firebaseAuth, validate, fields)
      : socialSignIn(firebaseAuth, providerName);
    return {
      type: 'FIREBASE_SIGN_IN',
      payload: promise,
      meta: { providerName, fields },
    };
  };
}

export function nativeSignIn(providerName) {
  return ({ FBSDK: { AccessToken, LoginManager }, firebaseAuth }) => {
    invariant(providerName === 'facebook',
     `${providerName} provider is not yet supported in nativeSignIn.`);
    const getPromise = async () => {
      const result = await LoginManager.logInWithReadPermissions(facebookPermissions);
      if (result.isCancelled) {
        // Mimic Firebase error to have the same universal API.
        const error = new Error('auth/popup-closed-by-user');
        error.code = 'auth/popup-closed-by-user';
        throw error;
      }
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      const facebookCredential = firebaseAuth.FacebookAuthProvider
        .credential(accessToken.toString());
      await firebaseAuth().signInWithCredential(facebookCredential);
    };
    return {
      type: 'FIREBASE_SIGN_IN',
      payload: getPromise(),
    };
  };
}

export function signUp(providerName, fields) {
  return ({ firebaseAuth, validate }) => {
    const getPromise = async () => {
      invariant(providerName === 'password',
       `${providerName} provider is not supported.`);
      const { email, password } = fields;
      await validateEmailAndPassword(validate, { email, password });
      try {
        return await firebaseAuth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        if (messages[error.code]) {
          throw mapFirebaseErrorToEsteValidationError(error.code);
        }
        throw error;
      }
    };
    return {
      type: 'FIREBASE_SIGN_UP',
      payload: getPromise(),
    };
  };
}

export function onPermissionDenied(message) {
  return {
    type: FIREBASE_ON_PERMISSION_DENIED,
    payload: { message },
  };
}

export function resetPassword(email, onSuccess) {
  return ({ firebaseAuth, validate }) => {
    const getPromise = async () => {
      await validate({ email })
        .prop('email')
          .required()
          .email()
        .promise;
      try {
        await firebaseAuth().sendPasswordResetEmail(email);
      } catch (error) {
        if (messages[error.code]) {
          throw mapFirebaseErrorToEsteValidationError(error.code);
        }
        throw error;
      }
      if (onSuccess) onSuccess();
    };
    return {
      type: 'FIREBASE_RESET_PASSWORD',
      payload: getPromise(),
    };
  };
}

export function firebaseStart() {
  const monitorPresence = createPresenceMonitor();

  return ({ dispatch, firebase, firebaseAuth, firebaseDatabase, getState }) => {
    firebaseAuth().getRedirectResult().then(result => {
      if (!result.credential) return;
      dispatch({ type: FIREBASE_SIGN_IN_SUCCESS, payload: result });
    }, error => {
      if (error.code === 'auth/operation-not-supported-in-this-environment') {
        return;
      }
      dispatch({ type: FIREBASE_SIGN_IN_ERROR, payload: error });
    });

    firebaseAuth().onAuthStateChanged(firebaseUser => {
      const user = mapFirebaseUserToAppUser(firebaseUser);
      monitorPresence(firebase, firebaseDatabase, user);
      dispatch(onAuth(user));
    });

    firebase.child('.info/connected').on('value', snap => {
      const online = snap.val();
      if (getState().app.online === online) return;
      dispatch({ type: online ? APP_ONLINE : APP_OFFLINE });
    });

    return {
      type: FIREBASE_START,
    };
  };
}
