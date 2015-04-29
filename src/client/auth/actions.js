import Promise from 'bluebird';
import setToString from '../../lib/settostring';
import {ValidationError} from '../../lib/validation';
import {dispatch} from '../dispatcher';
import {validate} from '../validation';

export function updateFormField({target: {name, value}}) {
  // Both email and password max length is 100.
  value = value.slice(0, 100);
  dispatch(updateFormField, {name, value});
}

export function login(fields) {
  return dispatch(login, validateForm(fields)
    .then(() => {
      return validateCredentials(fields);
    })
    .catch(error => {
      loginError(error);
      throw error;
    })
  );
}

function validateForm(fields) {
  return validate(fields)
    .prop('email').required().email()
    .prop('password').required().simplePassword()
    .promise;
}

function validateCredentials(fields) {
  // Simulate long async action.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fields.password === 'pass1')
        resolve();
      else
        reject(new ValidationError('Wrong password', 'password'));
    }, 3000);
  });
}

export function loginError(error) {
  dispatch(loginError, error);
}

export function logout() {
  // Always reload app on logout for security reasons.
  location.href = '/';
}

setToString('auth', {
  updateFormField, login, loginError, logout
});
