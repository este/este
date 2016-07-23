import fs from 'fs';
import path from 'path';

const descriptorsToMessages = descriptors =>
  descriptors.reduce((previous, { defaultMessage, id }) => ({
    ...previous, [id]: defaultMessage,
  }), {});

export default function loadMessages(options) {
  const {
    includeDefault = false,
  } = options || {};
  const isDictionary = fileName =>
    path.extname(fileName) === '.js' &&
    (includeDefault || !fileName.startsWith('_'));
  return fs.readdirSync('messages')
    .filter(isDictionary)
    .map(fileName => ({
      descriptors: require(`../../../messages/${fileName}`).default,
      locale: fileName.split('.')[0],
    }))
    .reduce((previous, { descriptors, locale }) => ({
      ...previous, [locale]: descriptorsToMessages(descriptors),
    }), {});
}
