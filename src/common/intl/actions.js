// @flow
import type { Action } from '../types';
import { Observable } from 'rxjs/Observable';
import { loadLocale } from '../../browser/intl';

export const setCurrentLocale = (locale: string): Action => ({
  type: 'LOAD_CURRENT_LOCALE',
  payload: { locale },
});

export const applyCurrentLocale = (locale: string): Action => ({
  type: 'SET_CURRENT_LOCALE',
  payload: { locale },
});

const applyLocale = (action$: any) =>
  action$.ofType('LOAD_CURRENT_LOCALE')
    .mergeMap(({ payload: { locale } }) =>
      // $FlowFixMe call of method `from` property `@@iterator` of $Iterable. Property not found in.
      Observable.from(loadLocale(locale))
        .map(() => applyCurrentLocale(locale)));

export const epics = [
  applyLocale,
];
