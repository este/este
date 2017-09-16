const diacritics = require('diacritics-map');

const nameToDomain = name =>
  name
    .toLowerCase()
    .split('')
    .map(char => diacritics[char] || char)
    .join('')
    .replace(/[^a-z0-9]/g, '');

const requiredShortText = value => {
  if (value.length === 0) return { type: 'required' };
  if (value.length < 2) return { type: 'minLength', minLength: 2 };
  if (value.length > 140) return { type: 'maxLength', maxLength: 140 };
};

module.exports = function(event) {
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
