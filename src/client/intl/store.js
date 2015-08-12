import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

const cachedFormatters = Object.create(null);
const intlRelativeFormat = new IntlRelativeFormat;

export default function(state, action, payload) {
  if (!action) return state.toJS();
  return state;
}

export function format(msg, options = null) {
  if (!options) return msg;
  return getCachedFormatter(msg).format(options);
}

export function dateFormat(date, locales, options) {
  // TODO: Cache or memoize.
  const dateTimeFormat = new Intl.DateTimeFormat(locales, options);
  return dateTimeFormat.format(date);
}

export function relativeDateFormat(date, options) {
  return intlRelativeFormat.format(date, options);
}

function getCachedFormatter(message) {
  if (message in cachedFormatters) return cachedFormatters[message];
  cachedFormatters[message] = new IntlMessageFormat(message);
  return cachedFormatters[message];
}
