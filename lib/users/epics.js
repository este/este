// @flow
import type { Epic } from '../../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
// import { isRequired } from '../validation';

const createUser = (getNow, createUuid, form) => {
  const now = getNow();
  return {
    ...form,
    id: createUuid(),
    createdAt: now,
    updatedAt: now,
  };
};

export const addUser: Epic = (action$, { createUuid, getNow, getState }) =>
  action$.filter(action => action.type === 'ADD_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements for 100% typing.
    // TODO: Remove once redux-observable flow definitions are available.
    if (action.type !== 'ADD_USER') throw Error();

    const user = createUser(getNow, createUuid, action.form);

    // TODO: Refactor to reuse. Explain step by step validation.

    if (!user.name)
      return Observable.of({
        type: 'ADD_USER_ERROR',
        id: user.id,
        validationErrors: { name: { type: 'required' } },
      });

    if (user.name.length < 3)
      return Observable.of({
        type: 'ADD_USER_ERROR',
        id: user.id,
        validationErrors: { name: { type: 'minLength', minLength: 3 } },
      });

    const emailIsNotValid = true;
    // email is optional, validate only if is defined
    // skladani operatoru?
    if (user.email && emailIsNotValid)
      return Observable.of({
        type: 'ADD_USER_ERROR',
        id: user.id,
        validationErrors: { email: { type: 'email' } },
      });

    // Yep, we can read from whole app state. Immutability ftw.
    if (Object.keys(getState().users.local).length > 20)
      return Observable.of({
        type: 'ADD_USER_ERROR',
        id: user.id,
        error: { type: 'insufficientStorage', limit: 20 },
      });

    // TODO: async validation, async saving with pending state

    return Observable.of({ type: 'ADD_USER_SUCCESS', user });
  });

export const add10RandomUsers: Epic = (action$, { createUuid, getNow }) =>
  action$
    .filter(action => action.type === 'ADD_10_RANDOM_USERS')
    .mergeMap(action => {
      if (action.type !== 'ADD_10_RANDOM_USERS') throw Error(); // refinement

      // TODO: Leverage addUser epic.
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
            email: '',
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
