import {ValidationError} from '../lib/validation';

export const actions = create();
export const feature = 'auth';

const formFieldMaxLength = 100;

// Note pattern, optional inject function. Remember the Law of Demeter.
export function inject(dispatch, validate, fetch, state) {
  return [dispatch, validate, fetch, () => state().msg.auth];
}

export function create(dispatch, validate, fetch, msg) {

  const validateForm = fields => validate(fields)
    .prop('email').required().email()
    .prop('password').required().simplePassword()
    .promise;

  // In real app, we would use smarter fetch wrapper.
  const validateCredentials = fields => fetch('/api/v1/auth/login', {
    body: JSON.stringify(fields),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post'
  }).then(response => {
    // TODO: Show how to handle different password/username server errors.
    if (response.status !== 200)
      throw new ValidationError(msg().form.wrongPassword, 'password');
    return fields;
  });

  return {

    login(fields) {
      dispatch(actions.login);

      return validateForm(fields)
        .then(() => validateCredentials(fields))
        .then(() => dispatch(actions.loginSuccess, fields))
        .catch(error => {
          dispatch(actions.loginFail, error);
          throw error;
        });
    },
    loginSuccess() {},
    loginFail() {},

    logout() {
      // Always reload app on logout for security reasons.
      location.href = '/';
    },

    setFormField({target: {name, value}}) {
      value = value.slice(0, formFieldMaxLength);
      dispatch(actions.setFormField, {name, value});
    }

  };

}
