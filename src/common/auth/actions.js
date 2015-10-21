export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_FORM_FIELD = 'SET_FORM_FIELD';

const FORM_FIELD_MAX_LENGTH = 100;

const validateForm = (validate, fields) => validate(fields)
  .prop('email').required().email()
  .prop('password').required().simplePassword()
  .promise;

const post = (fetch, endpoint, body) =>
  fetch(`/api/v1/${endpoint}`, {
    body: JSON.stringify(body),
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    method: 'post'
  })
  .then(response => {
    if (response.status === 200) return response.json();
    throw response;
  });

export function setFormField({target: {name, value}}) {
  value = value.slice(0, FORM_FIELD_MAX_LENGTH);
  return {
    type: SET_FORM_FIELD,
    payload: {name, value}
  };
}

export function login(fields) {
  return ({fetch, validate}) => ({
    type: [
      LOGIN,
      LOGIN_SUCCESS,
      LOGIN_ERROR
    ],
    payload: {
      promise: validateForm(validate, fields)
        .then(() => post(fetch, 'auth/login', fields))
        .catch(response => {
          // We can handle different password/username server errors here.
          if (response.status === 401)
            throw validate.wrongPassword('password');
          throw response;
        })
    }
  });
}
