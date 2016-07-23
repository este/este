// We store messages as code instead of as JSON because JSON sucks.
// - We can use comments, they are useful for translations.
// - Multiline strings ftw.
// - Translations are eslinted.
export function messagesToCode(messages) {
  messages.sort((a, b) => a.id.localeCompare(b.id));
  const messagesString = JSON
    .stringify(messages, null, 2)
    // Add trailing commas.
    .replace(/\n {2}\}/g, ',\n  }')
    .replace(/\}\n\]/g, '},\n]');

  return `/* eslint-disable max-len, quote-props, quotes */
export default ${messagesString};
`;
}

export const diff = (a, b) => a.filter(item => b.indexOf(item) === -1);
