// @flow
import type { Epic, Errors, AuthFormFields } from '../../types';
import { Observable } from 'rxjs/Observable';
import validate, { required, minLength, email } from '../validate';

const validateAuth = fields => {
  const validationErrors = validate(fields, {
    email: [required(), email()],
    password: [required(), minLength(5)],
  });
  if (!validationErrors) return Observable.of(fields);
  return Observable.throw(({ validationErrors }: Errors<AuthFormFields>));
};

export const signIn: Epic = action$ =>
  action$.filter(action => action.type === 'SIGN_IN').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'SIGN_IN') throw Error();

    return (
      Observable.of(action.fields)
        .mergeMap(validateAuth)
        // .mergeMap(() => Observable.throw({ appError: { type: 'xhrError' } }))
        .mapTo({ type: 'SIGN_IN_SUCCESS' })
        .catch((errors: Errors<AuthFormFields>) =>
          Observable.of({ type: 'SIGN_IN_ERROR', errors }),
        )
    );
  });
