// @flow
import * as validate from './';
import type { AuthInput } from '../mutations/__generated__/AuthMutation.graphql';

export default function validateAuth(input: AuthInput) {
  const email = validate.email(input.email);
  if (email) return { email };
  const password = validate.password(input.password);
  if (password) return { password };
}
