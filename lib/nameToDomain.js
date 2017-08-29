// @flow
import diacritics from 'diacritics-map';

const nameToDomain = (name: string) => {
  const domain = name
    .toLowerCase()
    .split('')
    .map(char => diacritics[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');
  return domain.length > 1 ? domain : '';
};

export default nameToDomain;
