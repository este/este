import IntlMessageFormat from 'intl-messageformat';

const cachedFormatters = Object.create(null);

export function format(msg, options = null) {
  if (!options) return msg;
  if (options.toJS) options = options.toJS();
  return getCachedFormatter(msg).format(options);
}

function getCachedFormatter(message) {
  if (message in cachedFormatters) return cachedFormatters[message];
  cachedFormatters[message] = new IntlMessageFormat(message);
  return cachedFormatters[message];
}
