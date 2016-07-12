import ValidationError from '../validation/ValidationError';
import invariant from 'invariant';
import mapFirebaseUserToAppUser from './mapFirebaseUserToAppUser';
import messages from './messages';
import { APP_OFFLINE, APP_ONLINE } from '../../app/actions';

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

const socialSignIn = async (firebaseAuth, providerName) => {
  invariant(providerName === 'facebook',
   `${providerName} provider is not yet supported.`);
  // firebase.google.com/docs/auth/web/facebook-login
  const provider = new firebaseAuth.FacebookAuthProvider();
  provider.addScope(facebookPermissions.join(','));
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
    [`users-emails/${user.id}`]: { email }
  });
  return {
    type: 'FIREBASE_SAVE_USER',
    payload: promise
  };
};

const onAuth = firebaseUser => ({ dispatch }) => {
  const user = mapFirebaseUserToAppUser(firebaseUser);
  if (user) {
    // TODO: Monitor user presence here.
    // https://firebase.google.com/docs/database/web/offline-capabilities
    // TODO: Save user only after sign in, once Firebase team tell me how.
    dispatch(saveUser(user));
  }
  return {
    type: FIREBASE_ON_AUTH,
    payload: { user }
  };
};

export function signIn(providerName, fields) {
  return ({ firebaseAuth, validate }) => {
    const promise = providerName === 'password'
      ? emailSignIn(firebaseAuth, validate, fields)
      : socialSignIn(firebaseAuth, providerName);
    return {
      type: 'FIREBASE_SIGN_IN',
      payload: promise
    };
  };
}

// TODO: Should ne nativeSignIn.
// export function fok(provider, fields) {
//   return ({ FBSDK: { AccessToken, LoginManager }, firebaseAuth }) => {
//     const getPromise = async () => {
//       // TODO: Use config
//       const permissions = facebookPermissions;
//       const result = await LoginManager.logInWithReadPermissions(permissions);
//       // TODO: Try to dispatch the same error as firebase.
//       // if (result.isCancelled) {
//       //   throw new Error('Login cancelled')
//       // }
//       const { accessToken } = await AccessToken.getCurrentAccessToken();
//       const facebookCredential = firebaseAuth.FacebookAuthProvider
//         .credential(accessToken.toString());
//       await firebaseAuth().signInWithCredential(facebookCredential);
//     }
//     return {
//       type: 'FOK',
//       payload: getPromise()
//     }
//   };
// }

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
      payload: getPromise()
    };
  };
}

export function onPermissionDenied(message) {
  return {
    type: FIREBASE_ON_PERMISSION_DENIED,
    payload: { message }
  };
}

export function resetPassword(email) {
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
    };
    return {
      type: 'FIREBASE_RESET_PASSWORD',
      payload: getPromise()
    };
  };
}

export function firebaseStart() {
  return ({ dispatch, firebase, firebaseAuth, getState }) => {
    firebaseAuth().getRedirectResult().then(result => {
      if (!result.credential) return;
      dispatch({ type: FIREBASE_SIGN_IN_SUCCESS, payload: result });
    }, error => {
      dispatch({ type: FIREBASE_SIGN_IN_ERROR, payload: error });
    });
    firebaseAuth().onAuthStateChanged(user => {
      dispatch(onAuth(user));
    });
    firebase.child('.info/connected').on('value', snap => {
      const online = snap.val();
      if (getState().app.online === online) return;
      dispatch({ type: online ? APP_ONLINE : APP_OFFLINE });
    });
    return {
      type: FIREBASE_START
    };
  };
}
