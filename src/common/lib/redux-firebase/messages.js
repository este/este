// Only selected relevant to user errors are translated.
// Use general error for the others.
// firebase.com/docs/web/guide/user-auth.html#section-handling-errors

import { defineMessages } from 'react-intl';

export default defineMessages({
  EMAIL_TAKEN: {
    defaultMessage: `The new user account cannot be created because the
      specified email address is already in use.`,
    id: 'firebase.error.EMAIL_TAKEN'
  },
  INVALID_EMAIL: {
    defaultMessage: 'The specified email is not a valid email.',
    id: 'firebase.error.INVALID_EMAIL'
  },
  INVALID_PASSWORD: {
    defaultMessage: 'The specified user account password is incorrect.',
    id: 'firebase.error.INVALID_PASSWORD'
  },
  INVALID_USER: {
    defaultMessage: 'The specified user account does not exist.',
    id: 'firebase.error.INVALID_USER'
  },
  NETWORK_ERROR: {
    defaultMessage: `An error occurred while attempting to contact the
      authentication server.`,
    id: 'firebase.error.NETWORK_ERROR'
  }
});
