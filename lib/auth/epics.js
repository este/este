// @flow
import type { Epic, Errors, AuthFormFields } from '../../types';
import { Observable } from 'rxjs/Observable';
import validate, { required, minLength, email } from '../validate';
// import { gql } from 'react-apollo';

const validateAuth = fields => {
  const validationErrors = validate(fields, {
    email: [required(), email()],
    password: [required(), minLength(5)],
  });
  if (!validationErrors) return Observable.of(fields);
  return Observable.throw(({ validationErrors }: Errors<AuthFormFields>));
};

// const signUpMutation = gql`
//   mutation signUp($email: String!, $password: String!) {
//     createUser(
//       authProvider: { email: { email: $email, password: $password } }
//     ) {
//       id
//     }
//     signinUser(email: { email: $email, password: $password }) {
//       token
//     }
//   }
// `;

export const signIn: Epic = (action$ /* , { apolloClient } */) =>
  action$.filter(action => action.type === 'SIGN_IN').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'SIGN_IN') throw Error();
    // apolloClient.mutate(options)
    // imperativne, pac to je imperativni, ok
    // potrebuju apollo, client, apolloClient, db?

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
