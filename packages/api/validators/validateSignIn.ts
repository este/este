import { validateEmail, validatePassword } from '.';
import { NexusGenAllTypes } from '../generated/nexus';

export const validateSignIn = (
  input: NexusGenAllTypes['SignInInput'],
): Required<NexusGenAllTypes['SignInErrors']> => ({
  email: validateEmail(input.email),
  password: validatePassword(input.password),
});
