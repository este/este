import { validateEmail, validatePassword } from '.';
import { NexusGenAllTypes } from '../typegen';

const validateSignIn = (
  input: NexusGenAllTypes['SignInInput'],
): Required<NexusGenAllTypes['SignInErrors']> => ({
  email: validateEmail(input.email),
  password: validatePassword(input.password),
});

export default validateSignIn;
