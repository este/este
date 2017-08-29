// @flow
import diacritics from 'diacritics-map';

const nameToDomain = (name: string) =>
  name
    .toLowerCase()
    .split('')
    .map(char => diacritics[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');

export default nameToDomain;
