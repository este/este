/* @flow */
import authErrorMessages from '../auth/errorMessages';
import { ValidationError } from '../lib/validation';
import { firebaseMessages } from '../lib/redux-firebase';

const isInnocuousError = error =>
  error.code === 'auth/popup-closed-by-user'; // Firebase stuff.

const validationErrorToMessage = error => ({
  message: authErrorMessages[error.name] || firebaseMessages[error.name],
  values: error.params,
});

// Map promiseMiddleware rejected error to UI message.
// Unknown errors are reported so the developer can check what is wrong.
const errorToMessage = (error: Object) => {
  // Some errors are so innocuos that we don't have to show any message.
  if (isInnocuousError(error)) {
    return { message: null };
  }

  // Note all app validation errors are mapped to UI messages here.
  // With such design the app can have a lot of various different components,
  // and it's not a component responsibility to project an error to UI.
  if (error instanceof ValidationError) {
    return validationErrorToMessage(error);
  }

  if (firebaseMessages[error.code]) {
    return { message: firebaseMessages[error.code] };
  }

  // Return null for unknown error so it will be reported.
  return null;
};

export default errorToMessage;
