// @flow
export type AppError =
  | { type: 'APP_ERROR', name: 'failedToFetch' }
  | { type: 'APP_ERROR', name: 'insufficientPermissions' }
  | { type: 'APP_ERROR', name: 'unknown', error: any };

const isNetworkError = error => error.message === 'Failed to fetch';

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
const isGraphQlInsufficientPermissionsError = error =>
  Array.isArray(error) && error.some(error => error.code === 3008);

export const mapErrorToAppError = (error: any): AppError => {
  if (isNetworkError(error))
    return { type: 'APP_ERROR', name: 'failedToFetch' };

  if (isGraphQlInsufficientPermissionsError(error))
    return { type: 'APP_ERROR', name: 'insufficientPermissions' };

  return { type: 'APP_ERROR', name: 'unknown', error };
};
