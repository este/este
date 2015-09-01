import IntlMessageFormat from 'intl-messageformat';
import {Record} from 'immutable';
import messages from '../messages';

const cachedFormatters = Object.create(null);

const initialState = new (Record({
  messages: messages.en
}));

export default function intlStore(state = initialState, action, payload) {
  if (!action) return state.toJS();
  return state;
}

export function msg(sth) {
  return sth;
}

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
