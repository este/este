import fs from 'fs';

const descriptorsToMessages = descriptors =>
  descriptors.reduce((previous, { defaultMessage, id }) => ({
    ...previous, [id]: defaultMessage
  }), {});

export default function loadMessages() {
  return fs.readdirSync('messages')
    .filter(fileName => !fileName.startsWith('_'))
    .map(fileName => ({
      descriptors: JSON.parse(fs.readFileSync(`messages/${fileName}`, 'utf8')),
      locale: fileName.split('.')[0]
    }))
    .reduce((previous, { descriptors, locale }) => ({
      ...previous, [locale]: descriptorsToMessages(descriptors)
    }), {});
}
