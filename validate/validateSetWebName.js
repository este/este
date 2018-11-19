// @flow
import * as validate from './';
import type { SetWebNameInput } from '../mutations/__generated__/SetWebNameMutation.graphql';

export default function validateSetWebName(input: SetWebNameInput) {
  const name = validate.max140Chars(input.name);
  if (name) return { name };
}
