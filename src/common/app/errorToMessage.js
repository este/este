import authErrorMessages from '../auth/errorMessages';
import { ValidationError } from '../lib/validation';
import { firebaseMessages } from '../lib/redux-firebase';

const isInnocuousError = error =>
  error.code === 'auth/popup-closed-by-user'; // Firebase stuff.

export default function errorToMessage(error) {
  // Some errors can be just ignored.
  if (isInnocuousError(error)) return null;

  // // TODO: Handle Firebase stuff. No net and no auth.
  // if (error.code === 'auth/network-request-failed') {
  // }

  if (error instanceof ValidationError) {
    const message =
      authErrorMessages[error.name] ||
      firebaseMessages[error.name];
    const values = error.params;
    return { message, values };
  }
  return undefined;
}
