// @flow
import * as diacritics from 'diacritics-map';

const nameToDomain = name =>
  name
    .toLowerCase()
    .split('')
    .map(char => diacritics[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');

// TODO: require requiredShortText from lib/validation somehow.
// https://www.graph.cool/forum/t/allow-functions-to-be-defined-and-versioned-in-app/917/7?u=daniel_steigerwald
const requiredShortText = value => {
  if (value.length === 0) return { type: 'required' };
  if (value.length < 3) return { type: 'minLength', minLength: 3 };
  if (value.length > 140) return { type: 'maxLength', maxLength: 140 };
};

// https://flow.org/en/docs/types/comments
/*::
type Event = {
  data: {
    name: string,
    domain: string,
  },
};
*/

export default async (event /*: Event */) => {
  // Prepare.
  event.data.name = event.data.name.trim();

  // Validate.
  const name = requiredShortText(event.data.name);
  if (name) return { error: JSON.stringify(name) };

  // Update.
  const domain = nameToDomain(event.data.name);
  const timestamp = Date.now().toString(36);
  event.data.domain = `${domain}-${timestamp}`;
  return event;
};
