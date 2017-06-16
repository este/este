// @flow
import type { Epic, FormError, UserForm } from '../../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import validate, { required, minLength, maxLength, email } from '../validate';

const createUser = (getNow, createUuid, form) => {
  const now = getNow();
  return {
    ...form,
    id: createUuid(),
    createdAt: now,
    updatedAt: now,
  };
};

const validateUser = user =>
  validate(user, {
    name: [required(), minLength(), maxLength()],
    email: [email(), maxLength()],
    isAnarchist: [required('agree')],
  });

const validateUsersLocalLength = local => user => {
  // We can add any ad hoc imperative validation.
  const someLimit = 20;
  if (Object.keys(local).length > someLimit)
    return Observable.throw({
      // TODO: Enforce type.
      appError: { type: 'insufficientStorage', limit: someLimit },
    });
  return Observable.of(user);
};

export const addUser: Epic = (action$, { createUuid, getNow, getState }) =>
  action$.filter(action => action.type === 'ADD_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    // TODO: Remove once redux-observable flow definitions are available.
    if (action.type !== 'ADD_USER') throw Error();

    const user = createUser(getNow, createUuid, action.form);

    // Validate object first, then app rules, then async.

    return (
      Observable.of(user)
        .mergeMap(validateUser)
        .mergeMap(validateUsersLocalLength(getState().users.local))
        // TODO: async validation with pending state
        // TODO: Enforce type.
        .mapTo({ type: 'ADD_USER_SUCCESS', user })
        .catch((error: FormError<UserForm>) =>
          Observable.of({ type: 'ADD_USER_ERROR', id: user.id, error }),
        )
    );
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
            isAnarchist: false,
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
