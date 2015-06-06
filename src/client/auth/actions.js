import Promise from 'bluebird';
import setToString from '../../lib/settostring';
import {ValidationError} from '../../lib/validation';
import {dispatch} from '../dispatcher';
import {validate} from '../validation';
import {msg} from '../intl/store';

export function login(fields) {
  // Promise, because we don't know whether fields are valid.
  const promise = validateForm(fields)
    .then(() => {
      return validateCredentials(fields);
    })
    .catch(error => {
      loginError(error);
      throw error;
    });

  return dispatch(login, promise);
}

function validateForm(fields) {
  // Validate function is just wrapper for node-validator providing promise api,
  // so we can mix client sync and server async validations easily.
  return validate(fields)
    // Of course we can add another validation methods.
    .prop('email').required().email()
    .prop('password').required().simplePassword()
    .promise;
}

function validateCredentials(fields) {
  return new Promise((resolve, reject) => {

    // For real usage, consider matthew-andrews/isomorphic-fetch.
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/auth/login', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    // TODO: Show how to handle different password/username server errors.
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200)
        resolve(fields);
      else
        reject(new ValidationError(msg('auth.form.wrongPassword'), 'password'));
    };

    xhr.send(JSON.stringify(fields));
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
