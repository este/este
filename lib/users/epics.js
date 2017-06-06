// @flow
import type { Epic } from '../../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';

export const addUser: Epic = (action$, { createUuid, getNow }) =>
  action$.filter(action => action.type === 'ADD_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements for 100% typing.
    // TODO: Remove once redux-observable flow definitions are available.
    if (action.type !== 'ADD_USER') throw Error();

    const now = getNow();
    const user = {
      ...action.form,
      id: createUuid(),
      createdAt: now,
      updatedAt: now,
    };

    return Observable.of({ type: 'ADD_USER_SUCCESS', user });
  });

export const add10RandomUsers: Epic = (action$, { createUuid, getNow }) =>
  action$
    .filter(action => action.type === 'ADD_10_RANDOM_USERS')
    .mergeMap(action => {
      if (action.type !== 'ADD_10_RANDOM_USERS') throw Error(); // refinement

      const actions = range(0, 10).map(i => {
        const id = createUuid();
        const now = getNow() + i;
        return {
          type: 'SAVE_USER_SUCCESS',
          user: {
            id,
            createdAt: now,
            updatedAt: now,
            name: id.split('-')[0],
            description: '',
            likesCats: false,
            likesDogs: false,
            gender: 'other',
            wantsKing: false,
          },
        };
      });

      return Observable.of(...actions);
    });

export const saveUser: Epic = (action$, { getNow }) =>
  action$.filter(action => action.type === 'SAVE_USER').mergeMap(action => {
    if (action.type !== 'SAVE_USER') throw Error(); // refinement

    const user = {
      ...action.user,
      updatedAt: getNow(),
    };

    return Observable.of({ type: 'SAVE_USER_SUCCESS', user });
  });
