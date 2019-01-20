import { SignInErrors, SignInInput } from '../api/types';
import { validateEmail, validatePassword } from './';

const validateSignIn = (input: SignInInput): SignInErrors => ({
  email: validateEmail(input.email),
  password: validatePassword(input.password),
});

export default validateSignIn;
