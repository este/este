import ValidationError from '../validation/ValidationError';
import mapAuthToUser from './mapAuthToUser';
import messages from './messages';

export const FIREBASE_LOGIN_ERROR = 'FIREBASE_LOGIN_ERROR';
export const FIREBASE_LOGIN_START = 'FIREBASE_LOGIN_START';
export const FIREBASE_LOGIN_SUCCESS = 'FIREBASE_LOGIN_SUCCESS';
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
export const FIREBASE_SIGN_UP_ERROR = 'FIREBASE_SIGN_UP_ERROR';
export const FIREBASE_SIGN_UP_START = 'FIREBASE_SIGN_UP_START';
export const FIREBASE_SIGN_UP_SUCCESS = 'FIREBASE_SIGN_UP_SUCCESS';

const mapFirebaseErrorToEsteValidationError = code => {
  const prop = {
    EMAIL_TAKEN: 'email',
    INVALID_EMAIL: 'email',
    INVALID_PASSWORD: 'password',
    INVALID_USER: 'email',
  }[code];
  return new ValidationError(code, { prop });
};

const validateEmailAndPassword = async (validate, fields) => {
  await validate(fields)
    .prop('email')
      .required()
      .email()
    .prop('password')
      .required()
      .simplePassword()
    .promise;
};

const authWithPassword = async (firebase, fields) => {
  try {
    await firebase.authWithPassword(fields);
  } catch (error) {
    if (messages[error.code]) {
      throw mapFirebaseErrorToEsteValidationError(error.code);
    }
    throw error;
  }
};

async function passwordLogin(firebase, validate, fields) {
  await validateEmailAndPassword(validate, fields);
  await authWithPassword(firebase, fields);
}

// Note this can't work in React Native because there is no browser.
// Use react-native-fbsdk and its token
async function socialLogin(firebase, provider) {
  const settings = { scope: 'email,user_friends' };
  // https://www.firebase.com/docs/web/guide/user-auth.html#section-popups
  try {
    await firebase.authWithOAuthPopup(provider, settings);
  } catch (error) {
    if (error.code === 'TRANSPORT_UNAVAILABLE') {
      // Pass an empty function until Firebase fixes bug.
      await firebase.authWithOAuthRedirect(provider, () => {}, settings);
    } else {
      throw error;
    }
  }
}

export function login(provider, fields) {
  return ({ firebase, validate }) => {
    const promise = provider === 'password'
      ? passwordLogin(firebase, validate, fields)
      : socialLogin(firebase, provider);
    return {
      type: 'FIREBASE_LOGIN',
      payload: promise
    };
  };
}

export function signUp(fields) {
  return ({ firebase, validate }) => {
    const getPromise = async () => {
      await validateEmailAndPassword(validate, fields);
      try {
        await firebase.createUser(fields);
      } catch (error) {
        if (messages[error.code]) {
          throw mapFirebaseErrorToEsteValidationError(error.code);
        }
        throw error;
      }
      await authWithPassword(firebase, fields);
    };
    return {
      type: 'FIREBASE_SIGN_UP',
      payload: getPromise()
    };
  };
}

export function saveUser(user) {
  return ({ firebase }) => {
    const json = user.toJS();
    const email = user.email;
    json.authenticatedAt = firebase.constructor.ServerValue.TIMESTAMP;
    delete json.email;
    // With Firebase multi-path updates, we can update values at multiple
    // locations at the same time. Powerful feature for data denormalization.
    const promise = firebase.update({
      [`users/${user.id}`]: json,
      [`users-emails/${user.id}`]: { email }
    });
    return {
      type: 'FIREBASE_SAVE_USER',
      payload: promise
    };
  };
}

export function onAuth(authData) {
  return ({ dispatch }) => {
    const user = mapAuthToUser(authData);
    if (user) {
      dispatch(saveUser(user));
    }
    return {
      type: FIREBASE_ON_AUTH,
      payload: { authData },
      meta: { user },
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
  return ({ firebase, validate }) => {
    const getPromise = async () => {
      await validate({ email })
        .prop('email')
          .required()
          .email()
        .promise;
      try {
        await firebase.resetPassword({ email });
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
