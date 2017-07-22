// @flow
import type { Epic, Errors } from '../types';
import type { User } from '../reducers/users';
import { Observable } from 'rxjs/Observable';
import { range } from 'ramda';
import validate, {
  required,
  requiredAgree,
  minLength,
  maxLength,
  email,
} from '../lib/validate';

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
  const validationErrors = validate(user, {
    name: [required(), minLength(), maxLength()],
    email: [email(), maxLength()],
    isAnarchist: [requiredAgree()],
  });
  return validationErrors
    ? Observable.throw(({ validationErrors }: Errors<User>))
    : Observable.of(user);
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
      if (Math.random() > 0.1) {
        observer.next(user);
      } else {
        observer.error(
          ({
            appError: { type: 'xhrError' },
          }: Errors<User>),
        );
      }
    }, 500);
  });

export const addUser: Epic = (action$, { createUuid, getNow, getState }) =>
  action$.filter(action => action.type === 'CREATE_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_USER') throw Error();

    const user = createUser(getNow, createUuid, action.fields);

    // Validate object first, then app rules, then do async.
    return Observable.of(user)
      .mergeMap(validateUser)
      .mergeMap(validateUsersLocalLength(getState().users.local))
      .mergeMap(simulateUserSave)
      .mapTo({ type: 'CREATE_USER_SUCCESS', user })
      .catch((errors: Errors<User>) =>
        Observable.of({ type: 'CREATE_USER_ERROR', errors }),
      );
  });

export const add10RandomUsers: Epic = (action$, { createUuid, getNow }) =>
  action$
    .filter(action => action.type === 'CREATE_10_RANDOM_USERS')
    .mergeMap(action => {
      // https://flow.org/en/docs/lang/refinements
      if (action.type !== 'CREATE_10_RANDOM_USERS') throw Error();

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
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'SAVE_USER') throw Error();

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
