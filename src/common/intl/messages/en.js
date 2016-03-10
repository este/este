// TODO: Remove as well.
export default {
  auth: {
    form: {
      wrongPassword: 'Wrong password.'
    },
    validation: {
      email: 'Email address is not valid.',
      password: 'Password must contain at least {minLength} characters.',
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`
    }
  }
};
