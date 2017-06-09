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

export const addUser: Epic = (action$, { createUuid, getNow }) =>
  action$.filter(action => action.type === 'ADD_USER').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements for 100% typing.
    // TODO: Remove once redux-observable flow definitions are available.
    if (action.type !== 'ADD_USER') throw Error();

    const user = createUser(getNow, createUuid, action.form);

    // return Observable.of({
    //   type: 'ADD_USER_ERROR',
    //   id: '1',
    //   validationErrors: {
    //     name: { type: 'required' },
    //   },
    // });
    return Observable.of({ type: 'ADD_USER_SUCCESS', user });

    // takhle?
    // Object.keys({
    //   name: [isRequired],
    // }).forEach(prop => {
    //   console.log(user[prop]);
    // });
    // user.

    // createUser() asi taky vracet observable, imho, ok
    // isRequired(user.name);
    // minLength(user.name, 3);
    // isRequired(user.description);
    // isEmail(user.description);

    // validate(fields)
    //   .prop('email')
    //   .required()
    //   .email()
    //   .prop('password')
    //   .required()
    //   .simplePassword().promise;

    // .catch(error => Observable.of({
    //     type: FETCH_USER_REJECTED,
    //     payload: error.xhr.response,
    //     error: true
    // }))
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
