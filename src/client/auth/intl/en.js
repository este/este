export default {
  form: {
    button: {
      login: 'Login',
      signup: 'Sign up'
    },
    hint: 'Hint: pass1',
    legend: 'Login / Sign Up',
    placeholder: {
      email: 'your@email.com',
      password: 'password'
    },
    wrongPassword: 'Wrong password.'
  },
  logout: {
    button: 'Logout'
  },
  index: {
    title: 'Login'
  },
  validation: {
    email: `Email address is not valid.`,
    password: `Password must contain at least {minLength} characters.`,
    required: `Please fill out {prop, select,
      email {email}
      password {password}
      other {'{prop}'}
    }.`
  }
};
