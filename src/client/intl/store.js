import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import {i18nCursor} from '../state';
import {register} from '../dispatcher';

const cachedInstances = Object.create(null);
const intlRelativeFormat = new IntlRelativeFormat;

function getCachedInstanceOf(message) {
  if (message in cachedInstances)
    return cachedInstances[message];
  // TODO: Add locales support.
  cachedInstances[message] = new IntlMessageFormat(message);
  return cachedInstances[message];
}

export function msg(path, values = null): string {
  const pathParts = ['messages'].concat(path.split('.'));
  const message = i18nCursor(pathParts);
  if (message == null)
    throw new ReferenceError('Could not find Intl message: ' + path);
  if (!values)
    return message;

  return getCachedInstanceOf(message).format(values);
}

export function relativeDateFormat(date, options?): string {
  return intlRelativeFormat.format(date, options);
}

export function dateFormat(date, locales?, options?): string {
  const dateTimeFormat = new Intl.DateTimeFormat(locales, options);
  return dateTimeFormat.format(date);
}

export const dispatchToken = register(({action, data}) => {
  // TODO: Allow changing locale without app reload. Reset cache, force update
  // root app component and PureComponents as well.
});
