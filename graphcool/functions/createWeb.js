// @flow
import * as diacritics from 'diacritics-map';
import * as validation from '../lib/validation';

/*::
type EventData = {
  name: string,
  domain: string
}
*/

export const validateWeb = (data /*: EventData */) => {
  const name = validation.shortText(data.name);
  if (name) return { name };
};

const nameToDomain = name =>
  name
    .toLowerCase()
    .split('')
    .map(char => diacritics[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');

export default async (event /*: { data: EventData } */) => {
  // Prepare.
  event.data.name = event.data.name.trim();

  // Validate.
  const validationErrors = validateWeb(event.data);
  if (validationErrors) {
    return { error: JSON.stringify(validationErrors) };
  }

  // Update.
  const domain = nameToDomain(event.data.name);
  const timestamp = Date.now().toString(36);
  event.data.domain = `${domain}-${timestamp}`;
  return event;
};
