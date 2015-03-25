import IntlMessageFormat from 'intl-messageformat';
import {i18nCursor} from '../state';
import {register} from '../dispatcher';

const cachedInstances = Object.create(null);

function getCachedInstanceOf(message) {
  if (message in cachedInstances)
    return cachedInstances[message];
  // TODO: Add locales support.
  cachedInstances[message] = new IntlMessageFormat(message);
  return cachedInstances[message];
}

export const dispatchToken = register(({action, data}) => {
  // TODO: Allow changing locale without app reload. Reset cache, force update
  // root app component and PureComponents as well.
});

export function msg(path, values = null): string {
  const pathParts = ['messages'].concat(path.split('.'));
  const message = i18nCursor().getIn(pathParts);
  if (message == null)
    throw new ReferenceError('Could not find Intl message: ' + path);
  if (!values)
    return message;

  return getCachedInstanceOf(message).format(values);
}
