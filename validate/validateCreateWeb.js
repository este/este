// @flow
import * as validate from './';
import type { CreateWebInput } from '../mutations/__generated__/CreateWebMutation.graphql';

export default function validateCreateWeb(input: CreateWebInput) {
  const name = validate.max140Chars(input.name);
  if (name) return { name };
  const pageTitle = validate.max140Chars(input.pageTitle);
  if (pageTitle) return { pageTitle };
}
