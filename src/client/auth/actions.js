import Promise from 'bluebird';
import setToString from '../../lib/settostring';
import {ValidationError} from '../../lib/validation';
import {dispatch} from '../dispatcher';
import {validate} from '../validation';

export function login(fields) {
  // Promise, because we don't know whether fields are valid etc.
  const promise = validateForm(fields)
    .then(() => {
      return validateCredentials(fields);
    })
    .catch(error => {
      loginError(error);
      throw error;
    });

  // With promise, we can use pending actions to temporally disable form.
  // It's the easiest way to prevent submitting form multiple times, and we can
  // show it in user interface easily with `actions.foo.pending` property.
  return dispatch(login, promise);
}

function validateForm(fields) {
  // This validate function is just dumb wrapper over node-validator providing
  // promise api, so we can mix client sync and server async validation easily.
  return validate(fields)
    // Of course you can add your own validation helpers. Easily.
    .prop('email').required().email()
    .prop('password').required().simplePassword()
    .promise;
}

function validateCredentials(fields) {
  // Simulate lengthy async action.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fields.password === 'pass1')
        resolve(fields);
      else
        reject(new ValidationError('Wrong password', 'password'));
    }, 1000);
  });
}

export function loginError(error) {
  dispatch(loginError, error);
}

export function logout() {
  // Always reload app on logout for security reasons.
  location.href = '/';
}

export function updateFormField({target: {name, value}}) {
  // Both email and password max length is 100.
  value = value.slice(0, 100);
  dispatch(updateFormField, {name, value});
}

setToString('auth', {
  login,
  loginError,
  logout,
  updateFormField
});
