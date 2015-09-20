/**
 * Actions
 */

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

/**
 * Action creators
 */

export function login(user) {
  return ({fetch}) => ({
    types: [
      FETCH_USER,
      FETCH_USER_SUCCESS,
      FETCH_USER_ERROR
    ],
    payload: {
      promise: fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(user)
      })
    }
  });
}
