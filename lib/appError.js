// @flow
import { reportMutationError } from './raven';

export type AppError =
  | { type: 'APP_ERROR', name: 'failedToFetch' }
  | { type: 'APP_ERROR', name: 'insufficientPermissions' }
  | { type: 'APP_ERROR', name: 'unknownError' };

const isNetworkError = error => error.message === 'Failed to fetch';

const isGraphQlInsufficientPermissionsError = error =>
  Array.isArray(error) && error.some(error => error.code === 3008);

// Some errors are innocent and expected. For example, wrongPassword.
// Such errors should be handled in a component.
// Some errors are serious and global. For example, failedToFetch.
// Such errors should be handled in AppError component.
export const mutationErrorToAppError = (error: any): AppError => {
  // Innocent expectable error. No need to report them.
  if (isNetworkError(error))
    return { type: 'APP_ERROR', name: 'failedToFetch' };

  if (isGraphQlInsufficientPermissionsError(error))
    return { type: 'APP_ERROR', name: 'insufficientPermissions' };

  // Something was wrong.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Investigate it, or it will be reported on production.');
    // eslint-disable-next-line no-console
    console.dir(error);
  } else {
    // Report it for further investigation.
    reportMutationError(error);
  }

  return { type: 'APP_ERROR', name: 'unknownError' };
};
