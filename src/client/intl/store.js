import * as actions from './actions';
import IntlMessageFormat from 'intl-messageformat';
import Immutable from 'immutable';
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
  // Allow changing locale without app reload. Reset cache, force update
  // root app component and PureComponents as well.
  switch (action) {
    case actions.onLanguageChange:
      i18nCursor(i18n => i18n.set('currentLocale', data));
      break;

  }

});

export function getCurrentLocale() {
  return i18nCursor().getIn(['currentLocale']);
}

export function msg(path, values = null): string {
  const pathParts = ['messages', getCurrentLocale()].concat(path.split('.'));
  const message = i18nCursor().getIn(pathParts);
  if (message == null)
    throw new ReferenceError('Could not find Intl message: ' + path);
  if (!values)
    return message;

  return getCachedInstanceOf(message).format(values);
}

export function getLocales() {
  let locales = [];
  i18nCursor().getIn(['messages']).map((message, locale) => {
    locales.push({ id: locale, text: message.getIn(['text'])});
  });
  return Immutable.fromJS(locales);
}
