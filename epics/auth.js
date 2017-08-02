// @flow
import type { Epic, Errors } from '../types';
import type { AuthFormFields } from '../reducers/auth';
import SigninMutation from '../mutations/SigninMutation';
import SignupMutation from '../mutations/SignupMutation';
// import Router from 'next/router';
import cookie from 'cookie';
import validate, { required, minLength, email } from '../lib/validate';
import { Observable } from 'rxjs/Observable';

const validateAuth = fields => {
  const validationErrors = validate(fields, {
    email: [required(), email()],
    password: [required(), minLength(5)],
  });
  if (!validationErrors) return Observable.of(fields);
  return Observable.throw(({ validationErrors }: Errors<AuthFormFields>));
};

const authenticate = environment => fields => {
  const commit = fields.signUp ? SignupMutation.commit : SigninMutation.commit;
  return commit(environment, fields.email, fields.password);
};

const setCookie = token => {
  // eslint-disable-next-line
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60, // one month, it's graph.cool default
  });
};

// const redirectToHomeOrRedirectUrl = () => {
//   // TODO: Use redirectUrl.
//   Router.replace('/');
//   return Observable.of(null);
// };

export const auth: Epic = (action$, { getEnvironment }) =>
  action$.filter(action => action.type === 'AUTH').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'AUTH') throw Error();

    return (
      Observable.of(action.fields)
        .mergeMap(validateAuth)
        .mergeMap(authenticate(getEnvironment()))
        .mergeMap(({ signinUser: { token } }) => {
          setCookie(token);
          return Observable.of(null);
        })
        // .mergeMap(redirectToHomeOrRedirectUrl)
        .mapTo({ type: 'AUTH_SUCCESS' })
        .catch((errors: Errors<AuthFormFields>) =>
          Observable.of({ type: 'AUTH_ERROR', errors }),
        )
    );
  });
