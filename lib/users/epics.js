// @flow
import type { Epic, Errors, User } from '../../types';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import validate, {
  required,
  requiredAgree,
  minLength,
  maxLength,
  email,
} from '../validate';

const createUser = (getNow, createUuid, form): User => {
  const now = getNow();
  return {
    ...form,
    id: createUuid(),
    createdAt: now,
    updatedAt: now,
  };
};

const validateUser = user => {
  // Need to be like that to not break typing.
  const validationErrors = validate(user, {
    name: [required(), minLength(), maxLength()],
    email: [email(), maxLength()],
    isAnarchist: [requiredAgree()],
  });
  if (!validationErrors) return Observable.of(user);
  const errors: Errors<User> = { validationErrors };
  return Observable.throw(errors);
};

const validateUsersLocalLength = local => user => {
  const someLimit = 20;
  if (Object.keys(local).length < someLimit) return Observable.of(user);
  const errors: Errors<User> = {
    appError: { type: 'insufficientStorage', limit: someLimit },
  };
  return Observable.throw(errors);
};

const simulateUserSave = user =>
  Observable.create(observer => {
    setTimeout(() => {
      // simulate random xhrError
      if (Math.random() > 0.5) {
        observer.next(user);
      } else {
        const errors: Errors<User> = {
          appError: { type: 'xhrError' },
        };
        observer.error(errors);
      }
    }, 1000);
  });

export const addUser: Epic = (action$, { createUuid, getNow, getState }) =>
  action$.filter(action => action.type === 'ADD_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    // TODO: Remove once redux-observable flow definitions are available.
    if (action.type !== 'ADD_USER') throw Error();

    const user = createUser(getNow, createUuid, action.form);

    // Validate object first, then app rules, then do async.
    return Observable.of(user)
      .mergeMap(validateUser)
      .mergeMap(validateUsersLocalLength(getState().users.local))
      .mergeMap(simulateUserSave)
      .mapTo({ type: 'ADD_USER_SUCCESS', user })
      .catch((errors: Errors<User>) =>
        Observable.of({ type: 'ADD_USER_ERROR', errors }),
      );
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
            email: '',
            likesCats: false,
            likesDogs: false,
            gender: 'other',
            isAnarchist: true,
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

    return Observable.of(user)
      .mergeMap(validateUser)
      .mergeMap(simulateUserSave)
      .mapTo({ type: 'SAVE_USER_SUCCESS', user })
      .catch((errors: Errors<User>) =>
        Observable.of({ type: 'SAVE_USER_ERROR', user, errors }),
      );
  });
