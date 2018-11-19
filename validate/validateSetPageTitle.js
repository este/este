// @flow
import * as validate from './';
import type { SetPageTitleInput } from '../mutations/__generated__/SetPageTitleMutation.graphql';

export default function validateSetPageTitle(input: SetPageTitleInput) {
  const title = validate.max140Chars(input.title);
  if (title) return { title };
}
