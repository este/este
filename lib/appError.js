// @flow
import { reportMutationError } from './raven';

export type AppError =
  | { type: 'APP_ERROR', name: 'failedToFetch' }
  | { type: 'APP_ERROR', name: 'insufficientPermissions' };

const isNetworkError = error => error.message === 'Failed to fetch';

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
const isGraphQlInsufficientPermissionsError = error =>
  Array.isArray(error) && error.some(error => error.code === 3008);

const isReportableMutationError = error => {
  // https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
  // We ignore:
  //  - InsufficientPermissions
  //  - ProjectNotFound
  //  - CannotSignInCredentialsInvalid
  //  - CannotSignUpUserWithCredentialsExist
  const expectedErrors = [3008, 3016, 3022, 3023];
  return (
    Array.isArray(error) &&
    error.some(error => !expectedErrors.includes(error.code))
  );
};

export const maybeMutationErrorToAppError = (error: any): ?AppError => {
  if (isNetworkError(error))
    return { type: 'APP_ERROR', name: 'failedToFetch' };

  if (isGraphQlInsufficientPermissionsError(error))
    return { type: 'APP_ERROR', name: 'insufficientPermissions' };

  if (isReportableMutationError(error)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('Investigate it, or it will be reported on production.');
      // eslint-disable-next-line no-console
      console.dir(error);
    } else {
      reportMutationError(error);
    }
  }

  return null;
};
