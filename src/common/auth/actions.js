export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ON_AUTH_FORM_FIELD_CHANGE = 'ON_AUTH_FORM_FIELD_CHANGE';

const FORM_FIELD_MAX_LENGTH = 100;

const validateForm = (validate, fields) => validate(fields)
  .prop('email').required().email()
  .prop('password').required().simplePassword()
  .promise;

const post = async (fetch, endpoint, body) => {
  const response = await fetch(`/api/v1/${endpoint}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  if (response.status === 200) return response.json();
  throw response;
};

export function onAuthFormFieldChange({target: {name, value}}) {
  value = value.slice(0, FORM_FIELD_MAX_LENGTH);
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {name, value}
  };
}

export function login(fields) {
  return ({fetch, validate}) => ({
    type: 'LOGIN',
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
